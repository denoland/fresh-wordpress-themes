// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import {
  WP_REST_API_Attachments,
  WP_REST_API_Post,
  WP_REST_API_Posts,
} from "utils/wp.ts";

function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

export function getAllPages(wp_api: string) {
  const api = new URL("./wp/v2/pages", wp_api);
  return request<WP_REST_API_Posts>(api.toString());
}

export interface PostWithImage extends WP_REST_API_Post {
  featuredImage?: {
    href: string;
    alt: string;
  };
}

export class WordPressPages {
  constructor(private wp_api: string) {}
  #pages: PostWithImage[] = [];

  async fetchData() {
    this.#pages = await this.getPages();
  }

  getChildren(parent: number) {
    return this.#pages.filter((page) => page.parent === parent);
  }

  getPage(slug: string) {
    return this.#pages.find((page) => page.slug === slug);
  }

  getMenu() {
    const menu = this.getChildren(0);
    return menu.map((page) => {
      const children = this.getChildren(page.id);
      return {
        ...page,
        children,
      };
    });
  }

  async getPages(): Promise<PostWithImage[]> {
    const fetchedPages = await this.fetchPages();
    const fetchedAttachments = await this.fetchAttachments();

    return fetchedPages.map((page) => {
      const featuredImage = fetchedAttachments.find(
        (attachment) => attachment.id === page.featured_media,
      );
      return {
        ...page,
        featuredImage: featuredImage
          ? { href: featuredImage.source_url, alt: featuredImage.alt_text }
          : undefined,
      };
    });
  }

  fetchPages() {
    const api = new URL("./wp/v2/pages", this.wp_api);
    return request<WP_REST_API_Posts>(api.toString());
  }

  fetchAttachments() {
    const api = new URL("./wp/v2/media", this.wp_api);
    return request<WP_REST_API_Attachments>(api.toString());
  }
}
