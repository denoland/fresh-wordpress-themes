// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import { getPages, getPosts, getSiteName, WP } from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { GlobalStyle } from "components/GlobalStyle.tsx";

type PageData = {
  pages: WP.WP_REST_API_Posts;
  posts: WP.WP_REST_API_Posts;
  siteName: string;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const [pages, siteName, posts] = await Promise.all([
      getPages(),
      getSiteName(),
      getPosts(),
    ]);
    return ctx.render({ pages, siteName, posts });
  },
};

export default function Post({ data }: PageProps<PageData>) {
  const { pages, siteName, posts } = data;
  return (
    <div>
      <GlobalStyle />
      <Header siteName={siteName} pages={pages} style="light" />
      <main class="p-4 mx-auto max-w-screen-lg pb-60">
        <h1 class="font-thin text-6xl">Post</h1>
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}
