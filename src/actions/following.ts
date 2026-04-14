"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { assertSessionUserId } from "./login";

export async function unFollowAuthor(authorId: number) {
  const userId = await assertSessionUserId();

  const db = getDb();
  await db
    .deleteFrom("user_followed")
    .where("user_id", "=", userId)
    
    .where("author_id", "=", authorId)
    .execute();
  revalidatePath("/");
}

export async function followAuthor(authorId: number) {
  const userId = await assertSessionUserId();
  
  const db = getDb();
  await db
    .insertInto("user_followed")
    .values({ user_id: userId, created_at: Date.now(), author_id: authorId })
    .onConflict((oc) => oc.columns(["user_id", "author_id"]).doNothing())
    .execute();
  revalidatePath("/");
}