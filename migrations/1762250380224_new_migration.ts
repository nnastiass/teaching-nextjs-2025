import { sql, type Kysely } from "kysely";


// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<unknown>): Promise<void> {
  await sql`CREATE TABLE users (
    id integer primary key autoincrement not null,
    email text not null,
    username text not null,
    password text not null
  ) STRICT`.execute(db);
 
  await sql`ALTER TABLE playlists
    ADD COLUMN user_id integer not null references users(id)`.execute(db);
}

