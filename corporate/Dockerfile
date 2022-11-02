# Copyright 2022 the Deno authors. All rights reserved. MIT license.
FROM wordpress:6.0.3-apache
RUN curl -owp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp
COPY bootstrap.sh .
COPY mysql_ping.php .
COPY sweets-co-data.xml ./wp-archive.xml
CMD ./bootstrap.sh
