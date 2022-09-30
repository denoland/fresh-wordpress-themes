// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import { getPages, getPosts, getSiteName, WP } from "utils/wp.ts";
import { Footer } from "components/Footer.tsx";
import { GlobalStyle } from "components/GlobalStyle.tsx";

type Data = {
  pages: WP.WP_REST_API_Posts;
  posts: WP.WP_REST_API_Posts;
  siteName: string;
};

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    const [pages, siteName, posts] = await Promise.all([
      getPages(),
      getSiteName(),
      getPosts(),
    ]);
    return ctx.render({ pages, siteName, posts });
  },
};

export default function Index({ data }: PageProps<Data>) {
  const { pages, siteName, posts } = data;
  return (
    <div>
      <GlobalStyle />
      <header class="w-full text-white bg-black text-lg font-light">
        <div class="p-4 mx-auto max-w-screen-lg pt-20">
          <a href="/" class="italic underline">{siteName}</a>
          <ul class="mx-4 mt-4 flex gap-6 flex-wrap justify-end">
            {pages.filter((page) => page.parent === 0).map((
              page,
            ) => (
              <li>
                <a
                  class="no-underline hover:underline"
                  href={new URL(page.link).pathname}
                >
                  {page.title.rendered}
                </a>
              </li>
            ))}
          </ul>
          <img src="cover.png" alt="Deno chasing a butterfly" />
        </div>
      </header>
      <main>
        <div class="p-4 mx-auto max-w-screen-lg">
          {posts.map((post) => <Post post={post} />)}
        </div>
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}

function Post({ post }: { post: WP.WP_REST_API_Post }) {
  return (
    <div class="pt-20 pb-32">
      <h2 class="font-thin text-6xl">
        <a href={`/post/${post.slug}`} style="text-underline-offset: 6px;">
          {post.title.rendered}
        </a>
      </h2>
      <FeaturedImage class="mt-10" post={post} />
      <div
        class="mt-10 text-lg font-light"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <p class="mt-10 italic">
        <a href={`/post/${post.slug}`}>
          {new Date(post.date).toLocaleString("en", {
            dateStyle: "long",
          })}
        </a>
      </p>
    </div>
  );
}

function FeaturedImage(props: { class?: string; post: WP.WP_REST_API_Post }) {
  // deno-lint-ignore no-explicit-any
  const source = (props.post._embedded?.["wp:featuredmedia"] as any)?.[0]
    ?.source_url;
  if (!source) {
    return null;
  }
  return (
    <div class={props.class}>
      <img src={source} />
    </div>
  );
}
