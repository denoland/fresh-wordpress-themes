// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { WpResponseMetadata } from "utils/wp.ts";

export function Pagination(
  { currentPage, metadata }: {
    currentPage: number;
    metadata: WpResponseMetadata;
  },
) {
  const totalPages = metadata.totalPages!;

  return (
    <div class="p-4 mx-auto max-w-screen-lg pb-60">
      <div class="flex justify-between">
        {currentPage > 1 && (
          <span>
            ← <a href="/">Previous page</a>
          </span>
        )}
        <Pages totalPages={totalPages} currentPage={currentPage} />
        {currentPage < totalPages && (
          <span>
            <a href="/">Next page page</a> →
          </span>
        )}
      </div>
    </div>
  );
}

function Pages(
  { totalPages: t, currentPage: c }: {
    totalPages: number;
    currentPage: number;
  },
) {
  return (
    <span class="flex gap-2">
      {c > 1 && <a href="/">1</a>}
      {c > 3 && <span>...</span>}
      {c > 2 && <a href={`/page/${c - 1}`}>{c - 1}</a>}
      <span>{c}</span>
      {c < t - 1 && <a href={`/page/${c + 1}`}>{c + 1}</a>}
      {c < t - 2 && <span>...</span>}
      {c < t && <a href={`/page/${t}`}>{t}</a>}
    </span>
  );
}
