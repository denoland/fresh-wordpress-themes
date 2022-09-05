/** @jsx h */
import { h } from "preact";

interface Post {
  title: string;
  description: string;
  image: string;
}

export default function Home() {
  const posts: Post[] = [
    {
      title: "Post 1",
      description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
      tellus et nulla tempor ornare. Ut at dolor ornare, pretium diam
      sed, rutrum quam. Integer sit amet porttitor neque. Nullam in dui
      volutpat, molestie tortor non, luctus lectus. Nunc pellentesque
      aliquam mauris, ut mollis neque dapibus at. Phasellus consectetur
      quam augue, sed volutpat quam ultricies quis.`,
      image: "macaron2.webp",
    },
    {
      title: "Post 2",
      description:
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
      tellus et nulla tempor ornare. Ut at dolor ornare, pretium diam
      sed, rutrum quam. Integer sit amet porttitor neque. Nullam in dui
      volutpat, molestie tortor non, luctus lectus. Nunc pellentesque
      aliquam mauris, ut mollis neque dapibus at. Phasellus consectetur
      quam augue, sed volutpat quam ultricies quis.`,
      image: "macaron3.webp",
    },
  ];

  return (
    <div>
      <div
        style="background-image: url(macaron.webp)"
        class="h-[48rem] bg-cover bg-center flex flex-col justify-between items-center"
      >
        <div class="bg-gradient-to-b from-gray-900 to-transparent w-full">
          {/* fade */}
          <nav class="flex max-w-7xl p-8 mx-auto">
            <div class="flex-1">
              <img src="/logo.svg" alt="Logo" />
            </div>

            <ul class="flex items-center uppercase text-white gap-4">
              <a href="https://twitter.com/deno_land">
                <img src="./tw.svg" alt="Twitter" />
              </a>
              <li>Menu</li>
              <li>Company</li>
              <li>Contact</li>
            </ul>
          </nav>
        </div>

        <div class="bg-gray-900 text-white w-xl text-center rounded px-8 py-12 flex flex-col gap-8 -mb-8 items-center shadow-xl">
          <h2 class="text-3xl font-serif">
            Infinite macarons everywhere.
          </h2>
          <button class="bg-red-600 px-12 py-3 uppercase rounded-3xl">
            Join the Waitlist
          </button>
        </div>
      </div>

      {posts.map((post) => (
        <div class="mt-40 max-w-5xl mx-auto md:flex gap-16 odd:flex-row-reverse px-4">
          <div class="flex-1 space-y-8">
            <h2 class="text-2xl font-bold">
              {post.title}
            </h2>

            <p>
              {post.description}
            </p>
          </div>
          <div
            class="w-md h-md bg-cover"
            style={`background-image: url(${post.image})`}
          >
            <img
              src="flake.svg"
              class="hidden md:block w-32 -ml-16 -mt-8 select-none"
              alt=""
            />
            {/* leave alt empty for the decorative image */}
          </div>
        </div>
      ))}

      <div>
        <img src="./line.svg" alt="" class="mx-auto mt-10" />
      </div>

      <footer class="text-center px-8 py-8">
        <img class="mx-auto w-32" src="/logo-dark.svg" alt="Logo" />
        <p class="text-gray-600 text-sm">
          Copyright © 2022 Sweets, co.
        </p>
      </footer>
    </div>
  );
}
