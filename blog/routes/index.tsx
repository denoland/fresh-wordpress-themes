import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPages, getPosts, getSiteName, WP } from "utils/wp.ts";

type Data = {
  pages: WP.WP_REST_API_Posts;
  posts: WP.WP_REST_API_Posts;
  siteName: string;
};

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
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
        <div class="p-4 mx-auto max-w-screen-lg pb-80">
          <a href="/" class="italic underline hover:opacity-70">{siteName}</a>
          <ul class="mx-4 mt-4 flex gap-4 flex-wrap justify-end">
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
            <div class=" pt-4 pb-40">
              <h2 class="font-extralight underline text-6xl py-4">
                {post.title.rendered}
              </h2>
              <p>{post.date}</p>
            </div>
          ))}
        </div>
      </main>
      <footer class="py-4 flex items-center justify-center">
        <p>Powered by Fresh and WordPress</p>
      </footer>
    </div>
  );
}
