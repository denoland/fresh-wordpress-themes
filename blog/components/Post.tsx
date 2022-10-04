// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WpPost } from "utils/wp.ts";

export function Post({ post }: { post: WpPost }) {
  return (
    <div class="pt-20 pb-32">
      <h2 class="font-thin text-6xl break-all">
        <a
          href={`/posts/${post.slug}`}
          style="text-underline-offset: 6px;"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
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
      <img src={source} class="w-full" />
    </div>
  );
}
