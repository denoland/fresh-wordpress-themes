// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import {
  getPages,
  getPosts,
  getSiteName,
  getStickyPost,
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
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const [pages, siteName, [posts, metadata], stickyPost] = await Promise.all([
      getPages(),
      getSiteName(),
      getPosts(1),
      getStickyPost(),
    ]);
    if (stickyPost) {
      posts.unshift(stickyPost);
    }
    return ctx.render({ pages, siteName, posts, metadata });
  },
};

export default function Index({ data }: PageProps<PageData>) {
  const { pages, siteName, posts, metadata } = data;
  return (
    <div>
      <Header siteName={siteName} pages={pages} style="dark">
        <img class="my-10" src="cover.png" alt="Deno chasing a butterfly" />
      </Header>
      <main class="p-4 mx-auto max-w-screen-lg">
        {posts.map((post) => <Post post={post} />)}
      </main>
      <Pagination currentPage={1} metadata={metadata} />
      <Footer siteName={siteName} />
    </div>
  );
}
