    // Sample data
    const songs = [
      {
        id: 1,
        title: "Ngoma Ya Taifa",
        cover: "https://via.placeholder.com/300x200?text=Ngoma+Ya+Taifa",
        uploadedAt: new Date("2025-07-25T00:00:00"),
        url: "song1.mp3",
        description: "A patriotic anthem celebrating the nation’s spirit."
      },
      {
        id: 2,
        title: "Lony Bway - Napenda",
        cover: "https://via.placeholder.com/300x200?text=Bongo+Flavor+Beat",
        uploadedAt: new Date("2025-08-04T12:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ0NjFf/Lony%20Bway%20-%20NAPENDA.mp3",
        description: "An energetic track that captures the pulse of Bongo Flava."
      },
      // add more songs here…
            {
        id: 3,
        title: "Zuchu - Amanda",
        cover: "",
        uploadedAt: new Date("2025-07-25T12:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQzMDBf/Zuchu%20-%20Amanda%20Clean%20Version.mp3",
        description: "An energetic track that captures the pulse of Bongo Flava."
      },
            {
        id: 4,
        title: "Quavo ft. Take Off - Messy",
        cover: "https://od.lk/d/MjBfMzQ0OTM0MjJf/1075218.jpg",
        uploadedAt: new Date("2025-07-25T13:00:00"),
        url: "https://od.lk/d/MjBfMzQ0NTU4MDlf/Quavo%20%26%20Takeoff%20-%20Messy%20%28Official%20visualizer%29.m4a",
        description: "An energetic track that captures the pulse of Bongo Flava."
      },
    ];

    // ELEMENTS
    const grid        = document.getElementById("songsGrid");
    const searchInput = document.getElementById("search");
    const themeToggle = document.getElementById("themeToggle");
    const listView    = document.getElementById("list-view");
    const detailView  = document.getElementById("detail-view");
    const backButton  = document.getElementById("backButton");
    const dCover      = document.getElementById("detailCover");
    const dTitle      = document.getElementById("detailTitle");
    const dTime       = document.getElementById("detailTime");
    const dDesc       = document.getElementById("detailDescription");
    const dPlayer     = document.getElementById("detailPlayer");
    const dlLink      = document.getElementById("downloadLink");
    const shareBtn    = document.getElementById("shareButton");

    // Sort newest first
    songs.sort((a,b) => b.uploadedAt - a.uploadedAt);

    // Render grid
    function renderGrid(list) {
      grid.innerHTML = "";
      list.forEach(song => {
        const card = document.createElement("div");
        card.className = "song-card";
        card.innerHTML = `
          <img src="${song.cover}" alt="${song.title}" loading="lazy" />
          <h3>${song.title}</h3>
          <p>${timeAgo(song.uploadedAt)}</p>
        `;
        card.onclick = () => location.hash = "song-" + song.id;
        grid.appendChild(card);
      });
    }

    // Format "time ago"
    function timeAgo(date) {
      const seconds = Math.floor((Date.now() - date) / 1000);
      const intervals = [
        { label: "year",   secs: 31536000 },
        { label: "month",  secs: 2592000 },
        { label: "day",    secs: 86400 },
        { label: "hour",   secs: 3600 },
        { label: "minute", secs: 60 }
      ];
      for (let i of intervals) {
        const count = Math.floor(seconds / i.secs);
        if (count > 0) return `${count} ${i.label}${count>1?'s':''} ago`;
      }
      return "just now";
    }

    // Show list or detail based on hash
    function updateView() {
      const hash = location.hash;
      if (hash.startsWith("#song-")) {
        const id = +hash.replace("#song-", "");
        showDetail(songs.find(s => s.id === id));
      } else {
        showList();
      }
    }

    function showList() {
      detailView.classList.add("hidden");
      listView.classList.remove("hidden");
    }

    function showDetail(song) {
      if (!song) return showList();
      dCover.src        = song.cover;
      dCover.alt        = song.title;
      dTitle.textContent= song.title;
      dTime.textContent = timeAgo(song.uploadedAt);
      dDesc.textContent = song.description;
      dPlayer.src       = song.url;
      dlLink.href       = song.url;
      shareBtn.onclick  = () => shareSong(song);
      listView.classList.add("hidden");
      detailView.classList.remove("hidden");
    }

    // Search filter
    searchInput.addEventListener("input", e => {
      const q = e.target.value.toLowerCase();
      renderGrid(songs.filter(s => s.title.toLowerCase().includes(q)));
    });

    // Theme toggle
    themeToggle.onclick = () => {
      document.body.classList.toggle("dark-theme");
      document.body.classList.toggle("light-theme");
    };

    // Back button
    backButton.onclick = () => location.hash = "";

    // Web Share
    function shareSong(song) {
      if (navigator.share) {
        navigator.share({
          title: song.title,
          text: song.description,
          url: window.location.href
        }).catch(()=>{});
      } else {
        alert("Share not supported");
      }
    }

    // Init
    window.addEventListener("hashchange", updateView);
    window.addEventListener("load", () => {
      renderGrid(songs);
      updateView();
    });
