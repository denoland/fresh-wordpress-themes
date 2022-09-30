// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { PageProps } from "fresh/server.ts";

export default function Greet(props: PageProps) {
  return <div>Hello {props.params.name}</div>;
}
