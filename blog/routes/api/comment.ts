// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers } from "fresh/server.ts";
import { postComment } from "utils/wp.ts";

type Comment = { post: number; name: string; email: string; content: string };

export const handler: Handlers = {
  async POST(req) {
    return Response.json(await postComment(await req.json() as Comment));
  },
};
