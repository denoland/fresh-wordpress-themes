// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WP } from "utils/wp.ts";
import cx from "utils/cx.ts";

type Props = {
  style: "dark" | "light";
  siteName: string;
  pages: WP.WP_REST_API_Posts;
  children?: unknown;
};

export function Header(
  { siteName, pages, style, children }: Props,
) {
  return (
    <header
      class={cx(
        "w-full text-lg font-light",
        style === "dark" && " text-white bg-black",
      )}
    >
      <div class="p-4 mx-auto max-w-screen-lg pt-20">
        <a href="/" class="italic underline">{siteName}</a>
        <ul class="mx-4 mt-4 flex gap-6 flex-wrap justify-end">
          {pages.filter((page) => page.parent === 0).map((
            page,
          ) => (
            <li>
              <a
                class="no-underline hover:underline"
                href={new URL(page.link).pathname}
              >
                {page.title.rendered}
              </a>
            </li>
          ))}
        </ul>
        {children}
      </div>
    </header>
  );
}
