export type BookmarkActionState = {
  error: string | null;
  success: string | null;
  fieldErrors?: {
    title?: string[];
    url?: string[];
  };
};

export type CreateBookmarkActionState = BookmarkActionState;
export type UpdateBookmarkActionState = BookmarkActionState;
export type DeleteBookmarkActionState = BookmarkActionState;

export const initialCreateBookmarkState: CreateBookmarkActionState = {
  error: null,
  success: null,
};

export const initialUpdateBookmarkState: UpdateBookmarkActionState = {
  error: null,
  success: null,
};

export const initialDeleteBookmarkState: DeleteBookmarkActionState = {
  error: null,
  success: null,
};
