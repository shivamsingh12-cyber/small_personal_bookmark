"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { BookmarkListItem } from "@/server/bookmarks/list-bookmarks";
import { initialUpdateBookmarkState, updateBookmarkAction } from "./actions";

type EditBookmarkFormProps = {
  bookmark: BookmarkListItem;
};

function SaveChangesButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl bg-[#142013] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1d2c1c] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}

export function EditBookmarkForm({ bookmark }: EditBookmarkFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(
    updateBookmarkAction,
    initialUpdateBookmarkState,
  );

  return (
    <div className="mt-6 border-t pt-5">
      {!isEditing ? (
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded-2xl border px-4 py-2.5 text-sm font-semibold text-[#142013] transition hover:bg-[#f8faf5]"
        >
          Edit bookmark
        </button>
      ) : (
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={bookmark.id} />

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[#142013]"
              htmlFor={`title-${bookmark.id}`}
            >
              Title
            </label>
            <input
              id={`title-${bookmark.id}`}
              name="title"
              type="text"
              defaultValue={bookmark.title}
              className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4]"
            />
            {state.fieldErrors?.title?.[0] ? (
              <p className="text-sm text-[#a12f24]">{state.fieldErrors.title[0]}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="text-sm font-medium text-[#142013]"
              htmlFor={`url-${bookmark.id}`}
            >
              URL
            </label>
            <input
              id={`url-${bookmark.id}`}
              name="url"
              type="url"
              defaultValue={bookmark.url}
              className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition focus:border-[#51624d] focus:ring-2 focus:ring-[#d9e5d4]"
            />
            {state.fieldErrors?.url?.[0] ? (
              <p className="text-sm text-[#a12f24]">{state.fieldErrors.url[0]}</p>
            ) : null}
          </div>

          <label className="flex items-center gap-3 rounded-2xl border bg-[#f8faf5] px-4 py-4">
            <input
              name="isPublic"
              type="checkbox"
              defaultChecked={bookmark.is_public}
              className="h-4 w-4 rounded border-[#b8c5b3] text-[#142013] focus:ring-[#d9e5d4]"
            />
            <span className="text-sm text-[#142013]">
              Make this bookmark public
            </span>
          </label>

          {state.error ? (
            <div className="rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-3 text-sm text-[#8b2b20]">
              {state.error}
            </div>
          ) : null}

          {state.success ? (
            <div className="rounded-2xl border border-[#b8cfb3] bg-[#f4fbf0] px-4 py-3 text-sm text-[#295f2d]">
              {state.success}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <SaveChangesButton />
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-2xl border px-4 py-2.5 text-sm font-semibold text-[#142013] transition hover:bg-[#f8faf5]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
