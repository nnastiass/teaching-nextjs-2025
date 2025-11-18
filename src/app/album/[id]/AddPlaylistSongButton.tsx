"use client";

import { addSongToPlaylist } from "@/actions/playlists";

export function AddSongToPlaylist(props: {
  playlistId: number;
  songId: number;
  playlistName: string;
}) {
  return (
    <button
      className="btn btn-xs"
      onClick={() => {
        console.log("Add");
        addSongToPlaylist(props.playlistId, props.songId);
      }}
    >
      Add to playlist{props.playlistName}
    </button>
  );
}