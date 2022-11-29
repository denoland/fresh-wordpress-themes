// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import * as WP from "https://raw.githubusercontent.com/johnbillion/wp-json-schemas/2117b51650c9a662803e74182edf06af9bd327f7/packages/wp-types/index.ts";

export { WP };
const WP_DOMAIN = Deno.env.get("WP_DOMAIN") || "http://localhost";
const IS_WPCOM = Deno.env.get("IS_WPCOM");
if (!WP_DOMAIN) {
  throw Error("WP_DOMAIN must assign");
}

export type WpPost = WP.WP_REST_API_Post;
export type WpCategory = WP.WP_REST_API_Category;
export type WpTag = WP.WP_REST_API_Tag;
export type WpUser = WP.WP_REST_API_User;
export type WpComment = WP.WP_REST_API_Comment;

export type WpResponseMetadata = {
  total: number | null;
  totalPages: number | null;
  status: number;
};

function toNum(s: string | null): number | null {
  return typeof s === "string" ? +s : s;
}

export async function callApi<T = unknown>(
  path: string,
  options?: RequestInit,
  overwriteUrl?: string,
): Promise<[T, WpResponseMetadata]> {
  const WP_API = (overwriteUrl)
    ? overwriteUrl
    : (!IS_WPCOM)
    ? `${WP_DOMAIN}/wp-json/wp/v2`
    : `https://public-api.wordpress.com/wp/v2/sites/${
      new URL(WP_DOMAIN).hostname
    }`;
  const resp = await fetch(WP_API + path, options);
  return [await resp.json() as T, {
    total: toNum(resp.headers.get("x-wp-total")),
    totalPages: toNum(resp.headers.get("x-wp-totalpages")),
    status: resp.status,
  }];
}

export async function getSiteName() {
  const [{ name }] = (!IS_WPCOM)
    ? await callApi<{ name: string }>(
      "/?fields=name",
      undefined,
      `${WP_DOMAIN}/wp-json`,
    )
    : await callApi<{ name: string }>(
      "/?fields=name",
      undefined,
      `https://public-api.wordpress.com/rest/v1.1/sites/${
        new URL(WP_DOMAIN).hostname
      }`,
    );
  return name;
}

/** Gets all pages */
export async function getPages(): Promise<WpPost[]> {
  const [pages] = await callApi<WpPost[]>(
    "/pages?per_page=100&orderby=menu_order&order=asc",
  );
  return pages;
}

const listQuery = "_embed=wp:featuredmedia";

/** Gets the posts of the given page */
export function getPosts(
  page: number,
): Promise<[WpPost[], WpResponseMetadata]> {
  const path = `/posts?page=${page}&${listQuery}`;
  return callApi<WpPost[]>(path);
}

/** Gets the posts of the given page in the given category */
export function getPostsByCategoryId(
  page: number,
  categoryId: number,
): Promise<[WpPost[], WpResponseMetadata]> {
  const path = `/posts?page=${page}&categories=${categoryId}&${listQuery}`;
  return callApi<WpPost[]>(path);
}

/** Gets the posts of the given page in the given tag */
export function getPostsByTagId(
  page: number,
  tagId: number,
): Promise<[WpPost[], WpResponseMetadata]> {
  const path = `/posts?page=${page}&tags=${tagId}&${listQuery}`;
  return callApi<WpPost[]>(path);
}

/** Gets the category of the given slug */
export async function getCategoryBySlug(
  slug: string,
): Promise<WpCategory | undefined> {
  const [categories] = await callApi<WpTag[]>(`/categories?slug=${slug}`);
  return categories[0];
}

/** Gets the tag of the given slug */
export async function getTagBySlug(slug: string): Promise<WpTag | undefined> {
  const [tags] = await callApi<WpTag[]>(`/tags?slug=${slug}`);
  return tags[0];
}

/** Gets the sticky post if exists */
export async function getStickyPost(): Promise<WpPost | undefined> {
  const path = `/posts?sticky=1&${listQuery}`;
  const [posts] = await callApi<WpPost[]>(path);
  return posts[0];
}

/** Gets the post by the give slug */
export async function getPostBySlug(slug: string): Promise<WpPost | undefined> {
  const path = `/posts?slug=${slug}&_embed=author,wp:term,replies`;
  const [posts] = await callApi<WpPost[]>(path);
  return posts[0];
}

/** Gets the post by the give slug */
export async function getPageBySlug(slug: string): Promise<WpPost | undefined> {
  const path = `/pages?slug=${slug}&_embed=author,wp:term`;
  const [posts] = await callApi<WpPost[]>(path);
  return posts[0];
}

type PostCommentParams = {
  post: number;
  name: string;
  email: string;
  content: string;
};

/** Posts an comment to the given post */
export async function postComment(params: PostCommentParams) {
  const path = `/comments`;
  const body = JSON.stringify({
    author_name: params.name,
    author_email: params.email,
    post: params.post,
    content: params.content,
  });
  const [res, meta] = await callApi<
    { code: string; message: string; data: { status: number } }
  >(path, {
    method: "POST",
    body,
    headers: { "content-type": "application/json" },
  });
  return [res, meta];
}
