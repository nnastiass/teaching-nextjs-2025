import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE user_followed (
    id integer primary key autoincrement not null,
    user_id integer not null,
    author_id integer not null,
		created_at integer not null,
    foreign key (user_id) references users (id),
    foreign key (author_id) references authors (id),
    unique (user_id, author_id)
  ) STRICT`.execute(db);
}
