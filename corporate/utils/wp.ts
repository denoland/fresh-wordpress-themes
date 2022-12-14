// Copyright 2022 the Deno authors. All rights reserved. MIT license.

export * from "https://raw.githubusercontent.com/johnbillion/wp-json-schemas/trunk/packages/wp-types/index.ts";

export let WP_API = Deno.env.get("WP_API") || "http://localhost/wp-json";

if (!WP_API) {
  throw new Error("WP_API env var is not defined");
}
if (!WP_API.endsWith("/")) {
  WP_API += "/";
}
