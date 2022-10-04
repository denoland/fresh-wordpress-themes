// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WpResponseMetadata } from "utils/wp.ts";

export function Pagination(
  { currentPage, metadata, pathPrefix = "" }: {
    pathPrefix?: string;
    currentPage: number;
    metadata: WpResponseMetadata;
  },
) {
  const totalPages = metadata.totalPages!;
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <div class="p-4 mx-auto max-w-screen-lg pb-60">
      <div class="flex justify-between">
        {prevPage && (
          <span>
            ←{" "}
            <a
              href={`${pathPrefix}/${prevPage === 1 ? "" : `page/${prevPage}`}`}
            >
              Previous page
            </a>
          </span>
        )}
        <Pages
          pathPrefix={pathPrefix}
          totalPages={totalPages}
          currentPage={currentPage}
        />
        {nextPage && (
          <span>
            <a href={`${pathPrefix}/page/${nextPage}`}>Next page</a> →
          </span>
        )}
      </div>
    </div>
  );
}

function Pages(
  { totalPages: t, currentPage: c, pathPrefix }: {
    pathPrefix: string;
    totalPages: number;
    currentPage: number;
  },
) {
  if (t === 1) {
    return null;
  }

  return (
    <span class="flex gap-2">
      {c > 1 && <a href={`${pathPrefix}/`}>1</a>}
      {c > 3 && <span>...</span>}
      {c > 2 && <a href={`${pathPrefix}/page/${c - 1}`}>{c - 1}</a>}
      <span>{c}</span>
      {c < t - 1 && <a href={`${pathPrefix}/page/${c + 1}`}>{c + 1}</a>}
      {c < t - 2 && <span>...</span>}
      {c < t && <a href={`${pathPrefix}/page/${t}`}>{t}</a>}
    </span>
  );
}
