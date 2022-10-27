// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { makePageMap } from "./page.ts";
import { assertEquals } from "std/testing/asserts.ts";

const pages = [
  {
    parent: 1,
  },
  { parent: undefined },
];

const pageMap = {
  "1": [{
    parent: 1,
  }],
};

Deno.test("makePageMap", () => {
  assertEquals(makePageMap(pages), pageMap);
});
