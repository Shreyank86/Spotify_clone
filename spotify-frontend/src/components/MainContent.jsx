import React, { useState, useEffect } from 'react';
import PlaylistCard from './PlaylistCard'; // Import the reusable card

function MainContent() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your backend
    fetch('http://localhost:5000/api/playlists')
      .then(res => res.json())
      .then(data => {
        setPlaylists(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching playlists:", err);
        setLoading(false);
      });
  }, []); // The empty array [] means this runs once on mount

  // Helper to get the first song of a playlist
  const getFirstSong = (playlist) => {
    return playlist.songs && playlist.songs.length > 0 ? playlist.songs[0] : null;
  };

  return (
    <div className="right border bg-grey">
      
      <div className="header">
        <header>
          <div className="profile">
            <img src="/logos/profile-circle-svgrepo-com.svg" className="invert" alt="profile" />
            <h3>Profile</h3>
          </div>
        </header>
        <header>
          <div className="settings profile">
            <img src="/logos/settings-svgrepo-com.svg" className="invert" alt="settings" />
            <h3>Settings</h3>
          </div>
        </header>
      </div>
      
      <h1>Welcome to Spotify</h1>

      {/* --- QUICK ACCESS (STATIC) --- */}
      <div className="quick-access">
        <div className="quick-card">
          <div className="quick-card-img">🎵</div>
          <h3>Liked Songs</h3>
        </div>
        <div className="quick-card">
          <div className="quick-card-img" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>🎧</div>
          <h3>Discover Weekly</h3>
        </div>
        <div className="quick-card">
          <div className="quick-card-img" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>🎤</div>
          <h3>Top Hits 2024</h3>
        </div>
        <div className="quick-card">
          <div className="quick-card-img" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>🎸</div>
          <h3>Rock Classics</h3>
        </div>
        <div className="quick-card">
          <div className="quick-card-img" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>💿</div>
          <h3>Chill Vibes</h3>
        </div>
        <div className="quick-card">
          <div className="quick-card-img" style={{ background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }}>🎹</div>
          <h3>Daily Mix 1</h3>
        </div>
      </div>

      {/* --- DYNAMIC PLAYLIST SECTION --- */}
      <div className="featured-section">
        <div className="section-header">
          <h2>Spotify Playlists</h2>
          <a href="#" className="show-all">Show all</a>
        </div>
        
        <div className="playlist-grid">
          {loading ? (
            <p>Loading playlists...</p>
          ) : (
            playlists.map(playlist => (
              <PlaylistCard 
                key={playlist._id} 
                title={playlist.name}
                description={playlist.description || "Click to play"}
                thumbnail={playlist.thumbnailPath} 
                // THIS IS THE CRITICAL LINE THAT WAS MISSING:
                song={getFirstSong(playlist)} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default MainContent;