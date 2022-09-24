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
.wp-block-columns {
  display: flex;
  margin-bottom: 1.75em;
  box-sizing: border-box;
  flex-wrap: wrap;
}
@media (min-width: 782px) {
  .wp-block-columns:not(.is-not-stacked-on-mobile)>.wp-block-column {
      flex-basis: 0;
      flex-grow: 1;
  }
  .wp-block-columns:not(.is-not-stacked-on-mobile)>.wp-block-column:not(:first-child) {
    margin-left: 2em;
  }
}
.wp-block-column {
    flex-grow: 1;
    min-width: 0;
    word-break: break-word;
    overflow-wrap: break-word;
}
.wp-block-image {
  margin: 0 0 1em;
}
.wp-block-image img {
  height: auto;
  max-width: 100%;
  vertical-align: bottom;
}
`;
export default function SinglePage(props: PageProps<SinglePageProps>) {
  return (
    <div>
      <div
        style={`background-image: url(${
          props.data.post.featuredImage.href ?? ""
        })`}
        class="h-[16rem] bg-cover bg-center flex flex-col justify-between items-center"
      >
        <Nav menu={props.data.menu} current={props.params.name} />
      </div>

      <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
        <div
          class={tw(postStyle) + " space-y-8"}
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

// wp-block-columns
