// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { GitHub } from "./IconGitHub.tsx";

export function Footer({ siteName }: { siteName: string }) {
  return (
    <footer class="py-10 text-lg">
      <div class="max-w-screen-lg mx-auto flex items-center justify-between">
        <span>
          <a class="italic" href="/">{siteName}</a>
        </span>
        <span>
          Proudly powered by{" "}
          <a href="https://fresh.deno.dev" class="font-bold" target="_blank">
            Fresh
          </a>{" "}
          and{" "}
          <a href="https://wordpress.org" class="font-bold" target="_blank">
            WordPress
          </a>
        </span>
        <span class="flex items-center gap-2">
          <GitHub />
          <a href="https://github.com/denoland/fresh-wordpress-templates">
            Source
          </a>
        </span>
      </div>
    </footer>
  );
}
