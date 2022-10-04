// Copyright 2022 the Deno authors. All rights reserved. MIT license.
import { WpCategory, WpPost, WpTag, WpUser } from "utils/wp.ts";

export function PostMain({ post }: { post: WpPost }) {
  return (
    <main class="mt-20 p-4 mx-auto max-w-screen-lg pb-60">
      <h1 class="font-thin text-6xl">{post.title.rendered}</h1>
      <hr class="mt-20 mb-20 border-black border-1" />
      <section class="mx-auto max-w-screen-sm text-lg">
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        {post.type === "post" && (
          <>
            <PostFooter post={post} />
            <hr class="mt-10 mb-20 border-black border-1" />
          </>
        )}
      </section>
    </main>
  );
}

function PostFooter({ post }: { post: WpPost }) {
  // deno-lint-ignore no-explicit-any
  const [c, t] = post._embedded?.["wp:term"] ?? [] as any;
  const categories: WpCategory[] = c || [];
  const tags: WpTag[] = t || [];
  // deno-lint-ignore no-explicit-any
  const author: WpUser[] = post._embedded?.author as any;

  return (
    <footer class="mt-20 flex gap-5">
      <span class="italic">
        {new Date(post.date).toLocaleString("en", {
          dateStyle: "long",
        })}
      </span>
      <span class="flex gap-1">
        {author.map((author) => <span>{author.name}</span>)}
      </span>
      <span class="flex gap-1">
        {categories.map((category) => (
          <a href={`/posts/category/${category.slug}`}>{category.name}</a>
        ))}
      </span>
      <span class="flex gap-1">
        {tags.map((tag) => <a href={`/posts/tag/${tag.slug}`}>{tag.name}</a>)}
      </span>
    </footer>
  );
}
