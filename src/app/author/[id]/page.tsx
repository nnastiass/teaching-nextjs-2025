import { getDb } from "@/lib/db";
import Link from "next/link";
import { FollowAuthorButton } from "./FollowAuthorButton";
import { getSessionUserId } from "@/actions/login";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const db = getDb();

  const { id } = await params;

  console.log("Album detail id:", id);

  const authorId = parseInt(id);
  const userId = await getSessionUserId();

  if (isNaN(authorId)) {
    return <div>Invalid Album id</div>;
  }

  const author = await db
    .selectFrom("authors")
    .selectAll()
    .where("id", "=", authorId)
    .executeTakeFirst();

  if (author == null) {
    return <div>Author not found</div>;
  }

  const albums = await db
    .selectFrom("albums")
    .selectAll()
    .where("author_id", "=", author.id)
    .execute();

  const followedAuthors =
    userId != null
      ? await db
          .selectFrom("user_followed")
          .select("author_id")
          .where("user_id", "=", userId)
          .execute()
      : null;

const followedAuthorsIds =
    followedAuthors != null ? new Set(followedAuthors.map((ls) => ls.author_id)) : null;
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>Name: {author.name}</div>
        <div>Bio: {author.bio}</div>

        <div>
          Albums:
          <ul>
            {albums.map((album) => (
              <li key={album.id}>
                <Link href={`/album/${album.id}`}>{album.name}</Link>
              </li>
            ))}
          </ul>
          {followedAuthorsIds != null ? (
                                <FollowAuthorButton
                                  authorId={author.id}
                                  isFollowed={followedAuthorsIds.has(author.id)}
                                />
                              ) : null}
        </div>
      </main>
    </div>
  );
}
