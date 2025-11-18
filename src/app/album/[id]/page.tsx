import { getDb } from "@/lib/db";
import Link from "next/link";
import { AddSongToPlaylist } from "./AddPlaylistSongButton";

function formatDuration(duration: number): string {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;

  return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
}

export default async function AlbumDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();

  const { id } = await params;

  console.log("Album detail id:", id);

  const albumId = parseInt(id);

  if (isNaN(albumId)) {
    return <div>Invalid Album id</div>;
  }

  const album = await db
    .selectFrom("albums")
    .innerJoin("authors", "authors.id", "albums.author_id")
    .select([
      "albums.name",
      "albums.release_date",
      "albums.author_id",
      "authors.name as author_name",
    ])
    .where("albums.id", "=", albumId)
    .executeTakeFirst();


  if (album === null || album === undefined) {

    return <div>Album not found</div>;
  }

  const songs = await db
    .selectFrom("songs")
    .selectAll()
    .where("album_id", "=", albumId)
    .execute();

  const playlists = await db
    .selectFrom("playlists")
    .where("user_id", "=", 1)
    .selectAll()
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          {album.name} by {album.author_name}
        </div>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, idx) => (
                <tr key={song.id}>
                  <td>{idx + 1}</td>
                  <td>{song.name}</td>
                  <td>{formatDuration(song.duration)}</td>
                  <td>
                    <details className="dropdown dropdown-end">
                      <summary className="btn btn-sm btn-primary m-0 px-4 py-2 flex items-center gap-3 rounded-full">
                        <span className="leading-none">Add to playlist: </span>
                        <span className="opacity-90 text-xs transform translate-y-px">▾</span>
                      </summary>
                      <ul className="dropdown-content menu p-3 bg-base-100 rounded-2xl shadow-2xl w-80 border border-gray-200">
                        {playlists.map((playlist) => (
                          <li key={playlist.id}>
                            <AddSongToPlaylist
                              playlistId={playlist.id}
                              songId={song.id}
                              playlistName={playlist.name}
                            />
                          </li>
                        ))}
                      </ul>
                    </details>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <Link
              className="btn btn-secondary btn-block"
              href={`/author/${album.author_id}`}
            >
              Detail Author
            </Link>
          </div>
        </div>
      </main>

    </div>
  );
}