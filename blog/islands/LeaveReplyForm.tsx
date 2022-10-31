// Copyright 2022 the Deno authors. All rights reserved. MIT license.

import { useEffect, useState } from "preact/hooks";
import Spinner from "components/icons/Spinner.tsx";
import cx from "utils/cx.ts";

export default function LeaveReplyForm({ post }: { post: number }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const disabled = !name || !email || !reply || loading;

  useEffect(() => {
    setName(localStorage.name || "");
    setEmail(localStorage.email || "");
  }, []);

  const onInputName = (name: string) => {
    setName(name);
    localStorage.name = name;
  };

  const onInputEmail = (email: string) => {
    setEmail(email);
    localStorage.email = email;
  };

  const leaveReply = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const resp = await fetch("/api/comment", {
        method: "POST",
        body: JSON.stringify({ post, name, email, content: reply }),
      });
      const [res, meta] = await resp.json();
      if (meta.status !== 201) {
        throw new Error(res.message);
      }
      if (res.status === "hold") {
        throw new Error(
          "Thank you for your reply. We received your comment. It will be published when it's manually approved by the site owner.",
        );
      }
      location.reload();
    } catch (e) {
      const div = document.createElement("div");
      div.innerHTML = e.message;
      alert(div.textContent);
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
          class="border rounded p-2"
          onInput={(e) => setReply(e.currentTarget.value)}
        >
          {reply}
        </textarea>
        <label class="mt-2">Name</label>
        <input
          size={20}
          class="border rounded p-2"
          value={name}
          onInput={(e) => onInputName(e.currentTarget.value)}
        />
        <label class="mt-2">Email</label>
        <input
          class="border rounded p-2"
          value={email}
          onInput={(e) => onInputEmail(e.currentTarget.value)}
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
