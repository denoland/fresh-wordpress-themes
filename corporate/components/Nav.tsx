/** @jsx h */
import { h } from "preact";

export default function Nav() {
  return (
    <div class="bg-gradient-to-b from-gray-900 to-transparent w-full">
      {/* fade */}
      <nav class="flex max-w-7xl p-8 mx-auto">
        <div class="flex-1">
          <a href="/" class="inline-block">
            <img src="/logo.svg" alt="Logo" />
          </a>
        </div>

        <ul class="flex items-center uppercase text-white gap-4">
          <a href="https://twitter.com/deno_land">
            <img src="./tw.svg" alt="Twitter" />
          </a>
          <li>
            <a href="/menu">Menu</a>
          </li>
          <li>
            <a href="/company">Company</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
