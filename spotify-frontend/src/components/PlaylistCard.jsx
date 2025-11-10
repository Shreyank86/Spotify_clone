import React from "react";
import { useSong } from "../contexts/SongContext";

function PlaylistCard({ title, description, thumbnail, songs }) {
  const { setCurrentSong } = useSong();

  const handleClick = () => {
    if (songs && songs.length > 0) {
      setCurrentSong(songs[0]); // Play first song for now
    } else {
      alert("No songs available in this playlist yet!");
    }
  };

  return (
    <div className="playlist-card" onClick={handleClick}>
      <div className="playlist-img">
        {thumbnail ? (
          <img
            src={`http://localhost:5000/${thumbnail}`}
            alt={title}
            className="playlist-img-cover"
          />
        ) : (
          "🎵"
        )}
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default PlaylistCard;
