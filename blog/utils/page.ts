// Copyright 2022 the Deno authors. All rights reserved. MIT license.

export function makePageMap<T extends { parent?: number }>(
  pages: T[],
): Record<string, T[]> {
  const pageMap: Record<number, T[]> = {};
  for (const page of pages) {
    if (page.parent) {
      const list = pageMap[page.parent] ??= [];
      list.push(page);
    }
  }
  return pageMap;
}
