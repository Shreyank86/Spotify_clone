import React from "react";
import { useSong } from "../contexts/SongContext";

function Player() {
  const { currentSong } = useSong();

  return (
    <div className="player">
      {currentSong ? (
        <div className="player-left">
          <img
            src={`http://localhost:5000/${currentSong.thumbnailPath}`}
            className="now-playing-img"
          />
          <div className="now-playing-info">
            <h4>{currentSong.title}</h4>
            <p>{currentSong.artist}</p>
          </div>
        </div>
      ) : (
        <p>Click a playlist to start playback 🎶</p>
      )}
    </div>
  );
}

export default Player;
