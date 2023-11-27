drop table if exists posts, users;

create table public.posts (
	id serial not null primary key,
    post text,
    likes int,
    comments int
);

create table public.users (
    id serial not null primary key,
    username text
);
