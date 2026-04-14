"use client";

import { unFollowAuthor } from "@/actions/following";

export function RemoveFollowButton({ authorId }: { authorId: number }) {
  return (
    <button className="btn btn-xs" onClick={() => unFollowAuthor(authorId)}>
      Remove Follow
    </button>
  );
}
