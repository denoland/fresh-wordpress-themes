// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { useState } from "preact/hooks";
import Spinner from "components/icons/Spinner.tsx";
import cx from "utils/cx.ts";

export default function LeaveReplyForm({ post }: { post: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = !name || !email || !reply || loading;

  const leaveReply = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      alert("TODO(kt3k): not implemented");
      location.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <section class="mt-20">
      <h2 class="text-2xl">Leave a Reply</h2>
      <div class="mt-4 flex flex-col gap-2 items-stretch">
        <label>Comment</label>
        <textarea
          class="border rounded"
          onInput={(e) => setReply(e.currentTarget.value)}
        >
          {reply}
        </textarea>
        <label class="mt-2">Name</label>
        <input
          size={20}
          class="border rounded"
          value={name}
          onInput={(e) => setName(e.currentTarget.value)}
        />
        <label class="mt-2">Email</label>
        <input
          class="border rounded"
          value={email}
          onInput={(e) => setEmail(e.currentTarget.value)}
        />
        <span class="text-sm">Your email address will not be published.</span>
        <button
          class={cx(
            "self-start mt-6 p-4 bg-blue-700 text-white rounded flex gap-2 items-center",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            disabled && "opacity-30",
          )}
          disabled={disabled}
          onClick={leaveReply}
        >
          {loading && <Spinner class="animate-spin" />}
          <span>Post Comment</span>
        </button>
      </div>
    </section>
  );
}
