alter table public.bookmarks enable row level security;
alter table public.bookmarks force row level security;

revoke all on public.bookmarks from anon;
revoke all on public.bookmarks from authenticated;

grant select on public.bookmarks to anon;
grant select, insert, update, delete on public.bookmarks to authenticated;

create policy "anon_can_read_public_bookmarks"
on public.bookmarks
for select
to anon
using (is_public = true);

create policy "authenticated_users_can_read_own_bookmarks"
on public.bookmarks
for select
to authenticated
using (auth.uid() = user_id);

create policy "authenticated_users_can_create_own_bookmarks"
on public.bookmarks
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "authenticated_users_can_update_own_bookmarks"
on public.bookmarks
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "authenticated_users_can_delete_own_bookmarks"
on public.bookmarks
for delete
to authenticated
using (auth.uid() = user_id);
