"use server";

import { getDb } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addSongToPlaylist(
  playlistId: number,
  songId: number
) {
  const db = getDb();

  await db
    .insertInto("playlists_songs")
    .values({ playlist_id: playlistId, song_id: songId })
    .execute();
}
export async function removeSongFromPlaylist(
  playlistId: number,
  songId: number
) {
  console.log(`Removing song ${songId} from playlist ${playlistId}`);
  const db = getDb();
  await db
    .deleteFrom("playlists_songs")
    .where("playlist_id", "=", playlistId)
    .where("song_id", "=", songId)
    .execute();
  revalidatePath(`/playlist/${playlistId}`);

}
