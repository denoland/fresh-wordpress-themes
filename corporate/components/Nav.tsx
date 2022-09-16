/** @jsx h */
import { h } from "preact";
import { PostWithImage } from "../data/posts.ts";

interface NavProps {
  menu?: PostWithImage[];
  current?: string;
}

export default function Nav(props: NavProps) {
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

          {props.menu?.filter((i) => i.slug !== "home").map((item) => (
            <li>
              <a
                href={`/${item.slug}`}
                class={`${props.current === item.slug ? "border-b-2" : ""}`}
              >
                {item.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
