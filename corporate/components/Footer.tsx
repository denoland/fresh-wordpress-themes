/** @jsx h */
import { h } from "preact";
import { IconBrandGithub } from "./Icons.tsx";

export default function Footer() {
  return (
    <footer class="text-center px-8 py-8">
      <img class="mx-auto w-32" src="/logo-dark.svg" alt="Logo" />

      <p class="text-gray-600 text-sm">
        Copyright © 2022 Sweets, co.
      </p>

      <div class="flex justify-center items-center gap-2 mt-6">
        <a href="https://fresh.deno.dev" class="inline-block">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
        <a
          href="https://github.com/denoland/fresh-wordpress-templates/tree/main/corporate"
          class="inline-block"
        >
          <IconBrandGithub alt="Source" />
        </a>
      </div>
    </footer>
  );
}
