/** @jsx h */
import { h } from "preact";
import { css, tw } from "twind/css";
import {
  WP_API,
  WP_REST_API_Attachments,
  WP_REST_API_Post,
  WP_REST_API_Posts,
} from "utils/wp.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import Nav from "../components/Nav.tsx";
import Footer from "../components/Footer.tsx";

interface Post extends WP_REST_API_Post {
  featuredImage?: {
    href: string;
    alt: string;
  };
}

const postStyle = css`
a {
  text-decoration: underline;
}
`;

export const handler: Handlers<Post[]> = {
  async GET(_req, ctx) {
    try {
      const api = new URL("./wp/v2/pages", WP_API);
      const json: WP_REST_API_Posts = await (await fetch(api)).json();
      const media = new URL("./wp/v2/media", WP_API);
      const mediaJson: WP_REST_API_Attachments = await (await fetch(media))
        .json();

      const posts = json.map((post) => {
        const featuredImage = mediaJson.find(
          (media) => media.id === post.featured_media,
        );
        return {
          ...post,
          featuredImage: featuredImage
            ? {
              href: featuredImage.source_url,
              alt: featuredImage.alt_text,
            }
            : undefined,
        };
      });

      return ctx.render(posts);
    } catch (e) {
      console.error(e);
    }
    return new Response("API endpoint error", { status: 500 });
  },
};

export default function Home(props: PageProps<Post[]>) {
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
