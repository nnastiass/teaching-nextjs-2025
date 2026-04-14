"use client";
import { followAuthor, unFollowAuthor } from "@/actions/following";

export function FollowAuthorButton({
  authorId,
  isFollowed,
}: {
  authorId: number;
  isFollowed: boolean;
})
{
  return (
    <button
      className="btn btn-xs btn-ghost w-8"
      onClick={() => (isFollowed ? unFollowAuthor(authorId) : followAuthor(authorId))}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}

