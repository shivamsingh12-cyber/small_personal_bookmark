"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import type { BookmarkListItem } from "@/server/bookmarks/list-bookmarks";
import { deleteBookmarkAction, updateBookmarkAction } from "./actions";
import {
  initialDeleteBookmarkState,
  initialUpdateBookmarkState,
} from "./action-states";

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

function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-2.5 text-sm font-semibold text-[#8b2b20] transition hover:bg-[#fdeae6] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Deleting..." : "Delete bookmark"}
    </button>
  );
}

export function EditBookmarkForm({ bookmark }: EditBookmarkFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [state, formAction] = useActionState(
    updateBookmarkAction,
    initialUpdateBookmarkState,
  );
  const [deleteState, deleteFormAction] = useActionState(
    deleteBookmarkAction,
    initialDeleteBookmarkState,
  );

  useEffect(() => {
    if (state.success) {
      setIsEditing(false);
    }
  }, [state.success]);

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
        <div className="space-y-4">
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

          <div className="border-t pt-4">
            <form
              action={deleteFormAction}
              onSubmit={(event) => {
                const confirmed = window.confirm(
                  `Delete "${bookmark.title}"? This action cannot be undone.`,
                );

                if (!confirmed) {
                  event.preventDefault();
                }
              }}
              className="space-y-3"
            >
              <input type="hidden" name="id" value={bookmark.id} />
              <DeleteButton />
              {deleteState.error ? (
                <div className="rounded-2xl border border-[#e5b2ab] bg-[#fff5f3] px-4 py-3 text-sm text-[#8b2b20]">
                  {deleteState.error}
                </div>
              ) : null}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
