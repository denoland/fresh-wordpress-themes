// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import {
  getPages,
  getPostsByTagId,
  getSiteName,
  getTagBySlug,
  WpPost,
  WpResponseMetadata,
  WpTag,
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
  tag: WpTag;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const tagName = ctx.params.tag;
    const currentPage = +ctx.params.page;
    const [pages, siteName, tag] = await Promise.all([
      getPages(),
      getSiteName(),
      getTagBySlug(tagName),
    ]);

    if (!tag) {
      return ctx.renderNotFound();
    }
    const [posts, metadata] = await getPostsByTagId(
      currentPage,
      tag.id,
    );
    return ctx.render({
      pages,
      siteName,
      posts,
      metadata,
      currentPage,
      tag,
    });
  },
};

export default function TagListPage({ data }: PageProps<PageData>) {
  const { pages, siteName, posts, metadata, currentPage, tag } = data;
  return (
    <div>
      <Header siteName={siteName} pages={pages} style="light" />
      <main class="p-4 mx-auto max-w-screen-lg">
        {posts.map((post) => <Post post={post} />)}
      </main>
      <Pagination
        pathPrefix={`/posts/tag/${tag.slug}`}
        currentPage={currentPage}
        metadata={metadata}
      />
      <Footer siteName={siteName} />
    </div>
  );
}
