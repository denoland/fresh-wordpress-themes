# Copyright 2022 the Deno authors. All rights reserved. MIT license.
FROM wordpress:latest
RUN curl -owp https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar
RUN chmod +x wp
COPY bootstrap.sh .
COPY mysql_ping.php .
CMD ./bootstrap.sh
