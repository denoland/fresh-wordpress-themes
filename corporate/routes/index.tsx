/** @jsx h */
import { h } from "preact";
import { css, tw } from "twind/css";
import { WP_API } from "utils/wp.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import { PostWithImage, WordPressPages } from "../data/posts.ts";

const postStyle = css`
a {
  text-decoration: underline;
}
`;

export const handler: Handlers<PostWithImage[]> = {
  async GET(_req, ctx) {
    try {
      const wp = new WordPressPages(WP_API!);
      await wp.fetchData();

      const homePage = wp.getPage("home");
      const children = wp.getChildren(homePage?.id!);

      return ctx.render(children);
    } catch (e) {
      console.error(e);
    }
    return new Response("API endpoint error", { status: 500 });
  },
};

export default function Home(props: PageProps<PostWithImage[]>) {
  return (
    <div>
      <div
        style="background-image: url(macaron.webp)"
        class="h-[48rem] bg-cover bg-center flex flex-col justify-between items-center"
      >
        <Nav />

        <div class="bg-gray-900 text-white w-xl text-center rounded px-8 py-12 flex flex-col gap-8 -mb-8 items-center shadow-xl">
          <h2 class="text-3xl font-serif">
            Infinite macarons everywhere.
          </h2>
          <button class="bg-red-600 px-12 py-3 uppercase rounded-3xl">
            Join the Waitlist
          </button>
        </div>
      </div>

      {props.data.map((post) => (
        <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
          <div class="flex-1 space-y-8">
            <h2 class="text-2xl font-bold">
              {post.title.rendered}
            </h2>
            <div
              class={tw(postStyle)}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          <div
            class="w-md h-md bg-cover"
            style={`background-image: url(${post.featuredImage?.href ?? ""})`}
            title={post.featuredImage?.alt ?? ""}
          >
            <img
              src="flake.svg"
              class="hidden md:block w-32 -ml-16 -mt-8 select-none"
              alt=""
            />
            {/* leave alt empty for the decorative image */}
          </div>
        </div>
      ))}

      <div>
        <img src="./line.svg" alt="" class="mx-auto mt-10" />
      </div>

      <Footer />
    </div>
  );
}
