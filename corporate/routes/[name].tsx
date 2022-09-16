/** @jsx h */
import { h } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";
import { WP_API } from "utils/wp.ts";
import { css, tw } from "twind/css";
import { PostWithImage, WordPressPages } from "../data/posts.ts";

interface SinglePageProps {
  post: PostWithImage;
  menu: PostWithImage[];
}

export const handler: Handlers<SinglePageProps> = {
  async GET(_req, ctx) {
    try {
      const wp = new WordPressPages(WP_API!);
      await wp.fetchData();

      const page = wp.getPage(ctx.params.name);

      return ctx.render({ post: page!, menu: wp.getMenu() });
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
export default function SinglePage(props: PageProps<SinglePageProps>) {
  return (
    <div>
      <div class="bg-black">
        <Nav menu={props.data.menu} current={props.params.name} />
      </div>

      <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
        <div
          class={tw(postStyle)}
          dangerouslySetInnerHTML={{ __html: props.data.post.content.rendered }}
        />
      </div>
      <div>
        <img src="./line.svg" alt="" class="mx-auto mt-10" />
      </div>
      <Footer />
    </div>
  );
}
