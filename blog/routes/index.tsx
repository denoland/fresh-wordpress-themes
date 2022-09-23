import { Handlers, PageProps } from "fresh/server.ts";
import { getPages, getPosts, getSiteName, WP } from "utils/wp.ts";

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
      <header class="w-full text-white bg-black text-lg font-light">
        <div class="p-4 mx-auto max-w-screen-lg pt-20">
          <a href="/" class="italic underline">{siteName}</a>
          <img src="cover.png" alt="Deno chasing a butterfly" />
          <ul class="mx-4 mt-4 flex gap-6 flex-wrap justify-end">
            {pages.filter((page) => page.parent === 0).map((
              page,
            ) => (
              <li class="hover:underline">
                <a href={new URL(page.link).pathname}>{page.title.rendered}</a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <main>
        <div class="p-4 mx-auto max-w-screen-lg">
          {posts.map((post) => (
            <div class="pt-20 pb-32">
              <h2
                class="font-thin underline text-6xl"
                style="text-decoration-thickness: 1px; text-underline-offset: 5px;"
              >
                {post.title.rendered}
              </h2>
              <div
                class="mt-10 text-lg font-light"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              <p
                class="mt-10 underline italic"
                style="text-decoration-thickness: 1px; text-underline-offset: 3px;"
              >
                {new Date(post.date).toLocaleString("en", {
                  dateStyle: "long",
                })}
              </p>
            </div>
          ))}
        </div>
      </main>
      <footer class="py-10 text-lg">
        <div class="max-w-screen-lg mx-auto flex items-center justify-between">
          <p>
            <a class="underline" href="/">{siteName}</a>
          </p>
          <p>
            Proudly powered by{" "}
            <a class="underline" href="https://fresh.deno.dev" target="_blank">
              Fresh
            </a>{" "}
            and{" "}
            <a class="underline" href="https://wordpress.org" target="_blank">
              WordPress
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
