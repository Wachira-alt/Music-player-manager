document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const playBtn = document.getElementById("play-btn");
  const progressBar = document.getElementById("progress-bar");
  const albumDisplay = document.querySelector(".album-display");
  const artistName = document.getElementById("artist-name");
  const songList = document.querySelector(".playlist");
  
  let currentSong = null;
  let audio = new Audio();

  // Fetch song data from db.json (simulated )
  const songs = [
      { id: 1, title: "Timeless (feat Playboi Carti)", artist: "The Weeknd", duration: "4:16", url: "song1.mp3", albumCover: "album1.jpg", genre: "pop" },
      { id: 2, title: "One Of The Girls", artist: "The Weeknd", duration: "4:04", url: "song2.mp3", albumCover: "album2.jpg", genre: "pop" }
  ];

  // Render songs dynamically
  function renderSongs(filteredSongs) {
      songList.innerHTML = "<h2>Popular</h2>";
      filteredSongs.forEach(song => {
          const songItem = document.createElement("div");
          songItem.classList.add("song-item");
          songItem.innerHTML = `
              <img src="${song.albumCover}" class="album-cover" alt="Album Cover">
              <div class="song-title">${song.title}</div>
              <div class="song-duration">${song.duration}</div>
              <button class="favorite-btn">❤</button>
          `;
          songItem.addEventListener("click", () => selectSong(song));
          songList.appendChild(songItem);
      });
  }

  // Select song function
  function selectSong(song) {
      currentSong = song;
      artistName.textContent = song.artist;
      albumDisplay.style.backgroundImage = `url(${song.albumCover})`;
      audio.src = song.url;
      playBtn.textContent = "▶";
  }

  // Play/Pause song
  playBtn.addEventListener("click", () => {
      if (!currentSong) return;
      if (audio.paused) {
          audio.play();
          playBtn.textContent = "⏸";
      } else {
          audio.pause();
          playBtn.textContent = "▶";
      }
  });

  // Update progress bar
  audio.addEventListener("timeupdate", () => {
      progressBar.value = (audio.currentTime / audio.duration) * 100;
  });

  // Search functionality (by title or genre)
  searchBar.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      const filteredSongs = songs.filter(song => 
          song.title.toLowerCase().includes(query) || song.genre.toLowerCase().includes(query)
      );
      renderSongs(filteredSongs.length ? filteredSongs : [{ title: "No results found", artist: "", duration: "", albumCover: "", url: "" }]);
  });

  // Initial render
  renderSongs(songs);
});