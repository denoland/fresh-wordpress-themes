// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { Handlers, PageProps } from "fresh/server.ts";
import { getPages, getPosts, getSiteName, WpPost } from "utils/wp.ts";
import { Header } from "components/Header.tsx";
import { Footer } from "components/Footer.tsx";
import { GlobalStyle } from "components/GlobalStyle.tsx";

type PageData = {
  pages: WpPost[];
  posts: WpPost[];
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

export default function Index({ data }: PageProps<PageData>) {
  const { pages, siteName, posts } = data;
  return (
    <div>
      <GlobalStyle />
      <Header siteName={siteName} pages={pages} style="dark">
        <img class="my-10" src="cover.png" alt="Deno chasing a butterfly" />
      </Header>
      <main class="p-4 mx-auto max-w-screen-lg">
        {posts.map((post) => <Post post={post} />)}
      </main>
      <Footer siteName={siteName} />
    </div>
  );
}

function Post({ post }: { post: WpPost }) {
  return (
    <div class="pt-20 pb-32">
      <h2 class="font-thin text-6xl">
        <a href={`/posts/${post.slug}`} style="text-underline-offset: 6px;">
          {post.title.rendered}
        </a>
      </h2>
      <FeaturedImage class="mt-10" post={post} />
      <div
        class="mt-10 text-lg font-light"
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
      />
      <p class="mt-10 italic">
        <a href={`/posts/${post.slug}`}>
          {new Date(post.date).toLocaleString("en", {
            dateStyle: "long",
          })}
        </a>
      </p>
    </div>
  );
}

function FeaturedImage(props: { class?: string; post: WpPost }) {
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
