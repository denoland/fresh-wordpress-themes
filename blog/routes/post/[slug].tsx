// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import {
  getPages,
  getPostBySlug,
  getSiteName,
  WpCategory,
  WpPost,
  WpTag,
  WpUser,
} from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { GlobalStyle } from "components/GlobalStyle.tsx";

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
    console.log(post);
    console.log(post._embedded);
    return ctx.render({ pages, siteName, post });
  },
};

export default function Post({ data }: PageProps<PageData>) {
  const { pages, siteName, post } = data;
  // deno-lint-ignore no-explicit-any
  const [c, t] = post._embedded?.["wp:term"] ?? [] as any;
  const categories: WpCategory[] = c;
  const tags: WpTag[] = t;
  return (
    <div>
      <GlobalStyle />
      <Header siteName={siteName} pages={pages} style="light" />
      <main class="mt-20 p-4 mx-auto max-w-screen-lg pb-60">
        <h1 class="font-thin text-6xl">{post.title.rendered}</h1>
        <hr class="mt-20 mb-20 border-black border-1" />
        <section class="mx-auto max-w-screen-sm text-lg">
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

          <p class="mt-20 flex gap-5">
            <span class="italic">
              {new Date(post.date).toLocaleString("en", {
                dateStyle: "long",
              })}
            </span>
            {post._embedded?.author.map((author: WpUser) => (
              <span>{author.name}</span>
            ))}
            <span class="flex gap-1">
              {categories.map((category) => (
                <a href={`/posts/category/${category.slug}`}>{category.name}</a>
              ))}
            </span>
            <span class="flex gap-1">
              {tags.map((tag) => (
                <a href={`/posts/tag/${tag.slug}`}>{tag.name}</a>
              ))}
            </span>
          </p>
          <hr class="mt-10 mb-20 border-black border-1" />
        </section>
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}
