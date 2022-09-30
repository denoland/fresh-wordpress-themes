// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import { getPageBySlug, getPages, getSiteName, WpPost } from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { PostMain } from "components/PostMain.tsx";
import { GlobalStyle } from "components/GlobalStyle.tsx";

type PageData = {
  pages: WpPost[];
  post: WpPost;
  siteName: string;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    console.log(ctx);
    const [pages, siteName, post] = await Promise.all([
      getPages(),
      getSiteName(),
      getPageBySlug(ctx.params.slug),
    ]);
    console.log(post);
    return ctx.render({ pages, siteName, post });
  },
};

export default function Post({ data }: PageProps<PageData>) {
  const { pages, siteName, post } = data;
  return (
    <div>
      <GlobalStyle />
      <Header siteName={siteName} pages={pages} style="light" />
      <PostMain post={post} />
      <Footer siteName={siteName} />
    </div>
  );
}
