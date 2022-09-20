import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getPages, getSiteName, WP } from "utils/wp.ts";

type Data = {
  pages: WP.WP_REST_API_Posts;
  siteName: string;
};

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const [pages, siteName] = await Promise.all([getPages(), getSiteName()]);
    return ctx.render({ pages, siteName });
  },
};

export default function Index(props: PageProps<Data>) {
  return (
    <div class="p-4 mx-auto max-w-screen-md">
      <a href="/" class="hover:underline">{props.data.siteName}</a>
      <ul class="mx-4 mt-4 flex gap-4">
        {props.data.pages.filter((page) => page.parent === 0).map((page) => (
          <li class="">
            <a href={new URL(page.link).pathname}>{page.title.rendered}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
