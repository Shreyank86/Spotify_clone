const songAPI = "http://localhost:5000/api/songs";
let songs = [];
let currentSongIndex = 0;
let audio = new Audio();

async function loadSongs() {
    try {
        const res = await fetch(songAPI);
        songs = await res.json();
        console.log("Songs loaded ✅", songs);

        displaySongs();
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

function displaySongs() {
    const grid = document.querySelector(".playlist-grid");
    grid.innerHTML = ""; 

    songs.forEach((song, index) => {
        const card = document.createElement("div");
        card.className = "playlist-card";
        card.innerHTML = `
            <div class="playlist-img" style="background: url('${song.thumbnailPath}') center/cover;">
                <div class="play-overlay"></div>
            </div>
            <h3>${song.title}</h3>
            <p>${song.artist}</p>
        `;
        card.addEventListener("click", () => playSong(index));
        grid.appendChild(card);
    });
}

function playSong(index) {
    currentSongIndex = index;
    const song = songs[index];

    audio.src = song.filePath.startsWith("http")
        ? song.filePath
        : `http://localhost:5000/${song.filePath}`;

    audio.play();

    // Update player UI
    document.querySelector(".now-playing-info h4").textContent = song.title;
    document.querySelector(".now-playing-info p").textContent = song.artist;

    console.log(`Now playing: ${song.title}`);
}

// Load on page start
window.onload = loadSongs;
