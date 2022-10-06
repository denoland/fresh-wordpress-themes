// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import { getPages, getPostBySlug, getSiteName, WpPost } from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { PostMain } from "components/PostMain.tsx";

type PageData = {
  pages: WpPost[];
  post: WpPost;
  siteName: string;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const [pages, siteName, post] = await Promise.all([
      getPages(),
      getSiteName(),
      getPostBySlug(ctx.params.slug),
    ]);
    if (!post) {
      return ctx.renderNotFound();
    }
    return ctx.render({ pages, siteName, post });
  },
};

export default function Post({ data }: PageProps<PageData>) {
  const { pages, siteName, post } = data;
  return (
    <div>
      <Header siteName={siteName} pages={pages} style="light" />
      <PostMain post={post} />
      <Footer siteName={siteName} />
    </div>
  );
}
