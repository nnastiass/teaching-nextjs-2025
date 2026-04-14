import { assertSessionUserId } from "@/actions/login";
import { getDb } from "@/lib/db";
import Link from "next/link";
import { RemoveFollowButton } from "./RemoveFollowButton";
// import { RemoveLikeButton } from "./RemoveLikeButton";

// function formatDuration(duration: number): string {
//   const minutes = Math.floor(duration / 60);
//   const seconds = duration % 60;

//   return `${minutes}` + ":" + `${seconds}`.padStart(2, "0");
// }

export default async function FollowingPage() {
  const userId = await assertSessionUserId();

  const db = getDb();

  const followedAuthors = await db
    .selectFrom("user_followed")
    .innerJoin("authors", "user_followed.author_id", "authors.id")
    .select([
      "authors.id as author_id",
      "authors.name as author_name",
    ])
    .where("user_followed.user_id", "=", userId)
    .execute();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <p className="text-2xl font-bold">Followed authors</p>
        <div>
          <table className="table">
            <thead>
              <tr>
                <th>Author</th>
                <th>Follow date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {followedAuthors.map((author, i) => (
                <tr key={author.author_id}>
                  <td>
                    <Link href={`/author/${author.author_id}`}>
                      {author.author_name}
                    </Link>
                  </td>
                  <td></td>
                  <td>
                    <RemoveFollowButton authorId={author.author_id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
