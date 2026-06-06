"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import {
  createBookmarkAction,
  initialCreateBookmarkState,
} from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-2xl bg-[#142013] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#1d2c1c] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
    >
      {pending ? "Saving..." : "Save bookmark"}
    </button>
  );
}

export function CreateBookmarkForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState(
    createBookmarkAction,
    initialCreateBookmarkState,
  );

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-[2rem] border bg-white p-8 shadow-sm sm:p-10"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#4d5b48]">
            Create Bookmark
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#142013]">
            Save a new link to your collection.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#495747]">
            Ownership is assigned from your authenticated session on the server,
            not from client input.
          </p>
        </div>
        <SubmitButton />
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium text-[#142013]" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4]"
            placeholder="Bookmark title"
          />
          {state.fieldErrors?.title?.[0] ? (
            <p className="text-sm text-[#a12f24]">{state.fieldErrors.title[0]}</p>
          ) : null}
        </div>

        <div className="space-y-2 md:col-span-1">
          <label className="text-sm font-medium text-[#142013]" htmlFor="url">
            URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4]"
            placeholder="https://example.com"
          />
          {state.fieldErrors?.url?.[0] ? (
            <p className="text-sm text-[#a12f24]">{state.fieldErrors.url[0]}</p>
          ) : null}
        </div>
      </div>

      <label className="mt-6 flex items-center gap-3 rounded-2xl border bg-[#f8faf5] px-4 py-4">
        <input
          name="isPublic"
          type="checkbox"
          className="h-4 w-4 rounded border-[#b8c5b3] text-[#142013] focus:ring-[#d9e5d4]"
        />
        <span className="text-sm text-[#142013]">
          Make this bookmark public
        </span>
      </label>

      {state.error ? (
        <div className="mt-6 rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-3 text-sm text-[#8b2b20]">
          {state.error}
        </div>
      ) : null}

      {state.success ? (
        <div className="mt-6 rounded-2xl border border-[#b8cfb3] bg-[#f4fbf0] px-4 py-3 text-sm text-[#295f2d]">
          {state.success}
        </div>
      ) : null}

      <div className="mt-6 sm:hidden">
        <SubmitButton />
      </div>
    </form>
  );
}
