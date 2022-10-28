// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WpPost } from "utils/wp.ts";
import cx from "utils/cx.ts";
import { makePageMap } from "utils/page.ts";

type Props = {
  style: "dark" | "light";
  siteName: string;
  pages: WpPost[];
  children?: unknown;
};

export function Header(
  { siteName, pages, style, children }: Props,
) {
  const pageMap = makePageMap(pages);
  return (
    <header
      class={cx(
        "w-full text-lg font-light",
        style === "dark" && " text-white bg-black",
      )}
    >
      <div class="p-4 mx-auto max-w-screen-lg pt-20">
        <a href="/" class="italic">{siteName}</a>
        <ul class="mx-4 mt-6 flex gap-6 flex-wrap justify-end">
          {pages.filter((page) => page.parent === 0).map((
            page,
          ) => (
            <li class="group">
              <a
                class="no-underline hover:underline"
                href={new URL(page.link).pathname}
              >
                {page.title.rendered}
              </a>
              {pageMap[page.id] && <span class="text-xs">{" "}▼</span>}
              {pageMap[page.id] && (
                <div class="pt-4 absolute invisible group-hover:visible">
                  <ul class="border bg-white text-black">
                    <ListItems
                      level={1}
                      pages={pageMap[page.id]}
                      pageMap={pageMap}
                    />
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
        {children}
      </div>
    </header>
  );
}

function ListItems(
  { pages, pageMap, level }: {
    level: number;
    pages: WpPost[];
    pageMap: Record<string, WpPost[]>;
  },
) {
  return (
    <>
      {pages.map((page) => (
        <li
          class={cx(
            "px-" + (level * 4 + 4),
            "py-4 border-b-1 last:border-b-0",
          )}
        >
          <a
            class="no-underline hover:underline"
            href={new URL(page.link).pathname}
          >
            {page.title.rendered}
          </a>
          {pageMap[page.id] && (
            <ListItems
              level={level + 1}
              pages={pageMap[page.id]}
              pageMap={pageMap}
            />
          )}
        </li>
      ))}
    </>
  );
}
