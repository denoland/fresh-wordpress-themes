// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import {
  getCategoryBySlug,
  getPages,
  getPostsByCategoryId,
  getSiteName,
  WpCategory,
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
  category: WpCategory;
};

export const handler: Handlers<PageData> = {
  async GET(_req, ctx) {
    const categoryName = ctx.params.category;
    const currentPage = +ctx.params.page;
    const [pages, siteName, category] = await Promise.all([
      getPages(),
      getSiteName(),
      getCategoryBySlug(categoryName),
    ]);

    if (!category) {
      return ctx.renderNotFound();
    }
    const [posts, metadata] = await getPostsByCategoryId(
      currentPage,
      category.id,
    );
    return ctx.render({
      pages,
      siteName,
      posts,
      metadata,
      currentPage,
      category,
    });
  },
};

export default function CategoryListPage({ data }: PageProps<PageData>) {
  const { pages, siteName, posts, metadata, currentPage, category } = data;
  return (
    <div>
      <Header siteName={siteName} pages={pages} style="light" />
      <main class="p-4 mx-auto max-w-screen-lg">
        {posts.map((post) => <Post post={post} />)}
      </main>
      <Pagination
        pathPrefix={`/posts/category/${category.slug}`}
        currentPage={currentPage}
        metadata={metadata}
      />
      <Footer siteName={siteName} />
    </div>
  );
}
