// Copyright 2022 the Deno authors. All rights reserved. MIT license.

export default function NotFoundPage() {
  return (
    <div>
      <main class="mt-10 p-4 mx-auto max-w-screen-lg pb-60 text-center">
        <img class="h-64 mx-auto" src="/fresh-balloon.svg"></img>
        <h1 class="mt-6 text-6xl">404</h1>
        <p class="mt-2 text-2xl">Not Found</p>
        <p class="mt-10">
          <a href="/">Home</a>
        </p>
      </main>
    </div>
  );
}
