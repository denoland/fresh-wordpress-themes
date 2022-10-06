// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import {
  getPages,
  getPosts,
  getSiteName,
  WpPost,
  WpResponseMetadata,
} from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { Pagination } from "components/Pagination.tsx";
import { Post } from "components/Post.tsx";

type PageData = {
  pages: WpPost[];
  posts: WpPost[];
  siteName: string;
  metadata: WpResponseMetadata;
  currentPage: number;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const currentPage = +ctx.params.page;
    const [pages, siteName, [posts, metadata]] = await Promise.all([
      getPages(),
      getSiteName(),
      getPosts(currentPage),
    ]);
    return ctx.render({ pages, siteName, posts, metadata, currentPage });
  },
};

export default function Index({ data }: PageProps<PageData>) {
  const { pages, siteName, posts, metadata, currentPage } = data;
  return (
    <div>
      <Header siteName={siteName} pages={pages} style="dark">
        <img class="my-10" src="/cover.png" alt="Deno chasing a butterfly" />
      </Header>
      <main class="p-4 mx-auto max-w-screen-lg">
        {posts.map((post) => <Post post={post} />)}
      </main>
      <Pagination currentPage={currentPage} metadata={metadata} />
      <Footer siteName={siteName} />
    </div>
  );
}
