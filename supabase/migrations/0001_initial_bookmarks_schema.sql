create extension if not exists pgcrypto;
create extension if not exists citext;

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email citext not null unique,
  handle text not null,
  created_at timestamptz not null default timezone('utc', now()),
  constraint profiles_handle_length_check
    check (char_length(handle) between 3 and 32),
  constraint profiles_handle_format_check
    check (handle ~ '^[a-z0-9_]+$')
);

create unique index profiles_handle_unique_idx
  on public.profiles (lower(handle));

create table public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  url text not null,
  is_public boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  constraint bookmarks_title_not_blank_check
    check (char_length(btrim(title)) > 0),
  constraint bookmarks_title_length_check
    check (char_length(title) <= 200),
  constraint bookmarks_url_not_blank_check
    check (char_length(btrim(url)) > 0),
  constraint bookmarks_url_scheme_check
    check (url ~* '^https?://')
);

create index bookmarks_user_id_created_at_idx
  on public.bookmarks (user_id, created_at desc);

create index bookmarks_public_created_at_idx
  on public.bookmarks (created_at desc)
  where is_public = true;

create index bookmarks_user_id_public_created_at_idx
  on public.bookmarks (user_id, is_public, created_at desc);
