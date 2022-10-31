// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WpCategory, WpComment, WpPost, WpTag, WpUser } from "utils/wp.ts";
import LeaveReplyForm from "../islands/LeaveReplyForm.tsx";

export function PostMain({ post }: { post: WpPost }) {
  return (
    <main class="mt-20 p-4 mx-auto max-w-screen-lg pb-60">
      <h1
        class="font-thin text-6xl"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      <hr class="mt-20 mb-20 border-black border-1" />
      <section class="mx-auto max-w-screen-sm text-lg">
        <div
          class="post-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
        <br class="clear-both" />
        {post.type === "post" && (
          <>
            <PostFooter post={post} />
            <hr class="mt-10 mb-20 border-black border-1" />
          </>
        )}
        <PostReplies post={post} />
        {post.comment_status === "open" && <LeaveReplyForm post={post.id} />}
      </section>
    </main>
  );
}

function PostReplies({ post }: { post: WpPost }) {
  if (!post._embedded?.replies) {
    return null;
  }

  // deno-lint-ignore no-explicit-any
  const replies_ = (post._embedded?.replies as any)[0] as WpComment[];

  if (!replies_ || replies_.length === 0) {
    return null;
  }

  const replies: (WpComment & { d: Date })[] = replies_.map((x) =>
    Object.assign(x, { d: new Date(x.date) })
  );

  replies.sort((x, y) => {
    if (x.d > y.d) {
      return 1;
    } else if (x.d < y.d) {
      return -1;
    } else {
      return 0;
    }
  });

  return (
    <section>
      <h2 class="text-2xl">
        Responses to{" "}
        "<span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />"
      </h2>
      {replies.map((reply) => (
        <div class="mt-10 px-6 text-sm">
          <div class="flex gap-3 items-center">
            <img
              class="h-8 w-8 rounded-full"
              src={reply.author_avatar_urls?.[96]}
            />
            <div class="flex flex-col">
              <span>{reply.author_name} says:</span>
              <span>
                {reply.d.toLocaleString("en", {
                  dateStyle: "medium",
                  timeStyle: "medium",
                })}
              </span>
            </div>
          </div>
          <div
            class="mt-4 px-2"
            dangerouslySetInnerHTML={{ __html: reply.content?.rendered! }}
          />
        </div>
      ))}
    </section>
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
      <span class="flex gap-2">
        {author.map((author) => <span>{author.name}</span>)}
      </span>
      <span class="flex gap-2">
        {categories.map((category) => (
          <a href={`/posts/category/${category.slug}`}>{category.name}</a>
        ))}
      </span>
      <span class="flex gap-2">
        {tags.map((tag) => <a href={`/posts/tag/${tag.slug}`}>{tag.name}</a>)}
      </span>
    </footer>
  );
}
