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

const globalStyle = `
a {
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}
a:hover {
  text-decoration-style: dashed;
}
`

export default function Index({ data }: PageProps<Data>) {
  const { pages, siteName, posts } = data;
  return (
    <div>
      <style dangerouslySetInnerHTML={{__html: globalStyle}} />
      <header class="w-full text-white bg-black text-lg font-light">
        <div class="p-4 mx-auto max-w-screen-lg pt-20">
          <a href="/" class="italic underline">{siteName}</a>
          <ul class="mx-4 mt-4 flex gap-6 flex-wrap justify-end">
            {pages.filter((page) => page.parent === 0).map((
              page,
            ) => (
              <li>
                <a class="hover:underline" href={new URL(page.link).pathname}>{page.title.rendered}</a>
              </li>
            ))}
          </ul>
          <img src="cover.png" alt="Deno chasing a butterfly" />
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
              <FeaturedImage class="mt-10" post={post} />
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
            <a class="underline italic" href="/">{siteName}</a>
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

function FeaturedImage(props: { class?: string, post: WP.WP_REST_API_Post }) {
  // deno-lint-ignore no-explicit-any
  const source = (props.post._embedded?.["wp:featuredmedia"] as any)?.[0]?.source_url;
  if (!source) {
    return null;
  }
  return <div class={props.class}><img src={source} /></div>;
}
