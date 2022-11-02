#!/usr/bin/env bash
# Copyright 2022 the Deno authors. All rights reserved. MIT license.

set -eu

user="www-data"
group="www-data"

if [ ! -e index.php ]; then
  chown "$user:$group" .
  echo >&2 "Copying WordPress"
  tar cf - -C /usr/src/wordpress --owner "$user" --group "$group" . | tar xf -
  echo >&2 "Complete! WordPress has been successfully copied to $PWD"
  echo >&2 "Copying 'wp-config-docker.php' (${!WORDPRESS_@})"
  # using "awk" to replace all instances of "put your unique phrase here" with a properly unique string (for AUTH_KEY and friends to have safe defaults if they aren't specified with environment variables)
  awk '
    /put your unique phrase here/ {
      cmd = "head -c1m /dev/urandom | sha1sum | cut -d\\  -f1"
      cmd | getline str
      close(cmd)
      gsub("put your unique phrase here", str)
    }
    { print }
  ' "wp-config-docker.php" > wp-config.php
  chown "$user:$group" wp-config.php
  php mysql_ping.php
  echo >&2 "Installing WordPress"

  ./wp --allow-root core install --url=localhost --title="Fresh WordPress Example Blog" --admin_user=user --admin_password=password --admin_email=info@example.com
  ./wp --allow-root option update permalink_structure '/%postname%'
  # allow non login users to make comment for demo purpose
  echo "add_filter( 'rest_allow_anonymous_comments', '__return_true' );" >> wp-content/themes/twentytwentytwo/functions.php
  ./wp --allow-root plugin install wordpress-importer --activate
  ./wp --allow-root import theme-unit-test.xml --authors=create
fi

apache2-foreground
