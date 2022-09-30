// Copyright 2022 the Deno authors. All rights reserved. MIT license.

export function Footer({ siteName }: { siteName: string }) {
  return (
    <footer class="py-10 text-lg">
      <div class="max-w-screen-lg mx-auto flex items-center justify-between">
        <p>
          <a class="underline italic" href="/">{siteName}</a>
        </p>
        <p>
          Proudly powered by{" "}
          <a class="underline" href="https://fresh.deno.dev" target="_blank">
            Fresh
          </a>{" "}
          and{" "}
          <a class="underline" href="https://wordpress.org" target="_blank">
            WordPress
          </a>
        </p>
      </div>
    </footer>
  );
}
