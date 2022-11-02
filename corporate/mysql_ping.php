<?php
// Copyright 2022 the Deno authors. All rights reserved. MIT license.
while (!mysqli_connect(
  getenv('WORDPRESS_DB_HOST'),
  getenv('WORDPRESS_DB_USER'),
  getenv('WORDPRESS_DB_PASSWORD'),
  getenv('WORDPRESS_DB_NAME'),
)) {
  echo "Checking MySQL server\n";
  sleep(2);
}
echo "MySQL server is ready\n";
