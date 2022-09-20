import * as WP from "https://raw.githubusercontent.com/johnbillion/wp-json-schemas/2117b51650c9a662803e74182edf06af9bd327f7/packages/wp-types/index.ts";

export { WP };
const WP_API = Deno.env.get("WP_API");

if (!WP_API) {
  throw Error("WP_API is not set");
}

export async function callApi<T = unknown>(path: `/${string}`) {
  const resp = await fetch(WP_API + path);
  return await resp.json() as T;
}

export async function getSiteName() {
  const { name } = await callApi<{ name: string }>("/?fields=name");
  return name;
}

/** Gets all pages */
export async function getPages() {
  return await callApi<WP.WP_REST_API_Posts>("/wp/v2/pages?per_page=100&orderby=menu_order&order=asc");
}

export async function getPosts(page?: number) {
  const path = "/wp/v2/posts";
  return await callApi<WP.WP_REST_API_Posts>(
    page ? `${path}?page=${page}` : path,
  );
}
