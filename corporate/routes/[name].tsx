/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import { WP_API, WP_REST_API_Post } from "utils/wp.ts";
import { css, tw } from "twind/css";
import { WordPressPages } from "../data/posts.ts";

export const handler: Handlers<WP_REST_API_Post> = {
  async GET(_req, ctx) {
    try {
      const wp = new WordPressPages(WP_API!);
      await wp.fetchData();

      const page = wp.getPage(ctx.params.name);

      return ctx.render(page);
    } catch (e) {
      console.error(e);
    }
    return new Response("API endpoint error", { status: 500 });
  },
};

const postStyle = css`
a {
  text-decoration: underline;
}
`;
export default function SinglePage(props: PageProps<WP_REST_API_Post>) {
  return (
    <div>
      <div class="bg-black">
        <Nav />
      </div>

      <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
        <div
          class={tw(postStyle)}
          dangerouslySetInnerHTML={{ __html: props.data.content.rendered }}
        />
      </div>
      <div>
        <img src="./line.svg" alt="" class="mx-auto mt-10" />
      </div>
      <Footer />
    </div>
  );
}
