/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import {
  WP_API,
  WP_REST_API_Attachments,
  WP_REST_API_Post,
  WP_REST_API_Posts,
} from "utils/wp.ts";
import { css, tw } from "twind/css";

export const handler: Handlers<WP_REST_API_Post> = {
  async GET(_req, ctx) {
    try {
      const api = new URL("./wp/v2/pages", WP_API);
      const json: WP_REST_API_Posts = await (await fetch(api)).json();
      const media = new URL("./wp/v2/media", WP_API);
      const mediaJson: WP_REST_API_Attachments = await (await fetch(media))
        .json();

      const post = json.filter((post) => post.slug === ctx.params.name)[0];

      return ctx.render(post);
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
