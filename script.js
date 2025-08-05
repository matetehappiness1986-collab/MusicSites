    // Sample data
    const songs = [
      {
        id: 1,
        title: "Dogo Rema X Trechyson Molly Vx My everything Amapiano Remake",
        cover: "https://od.lk/d/MjBfMzQ0OTQ2OTlf/Screenshots_2025-08-05-02-27-44.png",
        uploadedAt: new Date("2025-07-29T00:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ2Njlf/Dogo_Rema_X_Trechyson_Molly_Vx_My_everything_Amapiano_Remake.mp3",
        description: "A patriotic anthem celebrating the nation’s spirit."
      },
      {
        id: 2,
        title: "Lony Bway - Napenda",
        cover: "https://od.lk/d/MjBfMzQ0OTQ1NTlf/Lony-Bway-NAPENDA-820x545.jpg",
        uploadedAt: new Date("2025-08-01T12:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ0NjFf/Lony%20Bway%20-%20NAPENDA.mp3",
        description: "An energetic track that captures the pulse of Bongo Flava."
      },
      // add more songs here…
            {
        id: 3,
        title: "Zuchu - Amanda",
        cover: "https://od.lk/d/MjBfMzQ0OTQ1NTVf/Screenshots_2025-08-05-01-27-00.png",
        uploadedAt: new Date("2025-08-01T12:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQzMDBf/Zuchu%20-%20Amanda%20Clean%20Version.mp3",
        description: "An energetic track that captures the pulse of Bongo Flava."
      },
            {
        id: 4,
        title: "Dogo Rema - Week-End",
        cover: "https://od.lk/d/MjBfMzQ0OTQ2Mzhf/dogo-remaaa-820x545.webp",
        uploadedAt: new Date("2025-07-25T13:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ2MzJf/Dogo%20Rema%20-%20Weekend.mp3",
        description: "Dogo Rema kaamua kuja Juu na kulipaisha Soko la doto Magari kupitia sanaa ya Muziki #Bongo Flava."
      },
             {
        id: 5,
        title: "D Voice x Mzee wa Bwax feat Whozu x G Nako",
        cover: "https://od.lk/d/MjBfMzQ0OTQ3MTJf/Screenshots_2025-08-05-02-34-45.png",
        uploadedAt: new Date("2025-07-28T13:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ2ODRf/D%20Voice%20x%20Mzee%20wa%20Bwax%20feat%20Whozu%20%26%20G%20Nako%20-%20Ganda%20Remix.mp3",
        description: ""
      },
        {
        id: 6,
        title: "Huyu Hapa - Kusah",
        cover: "https://od.lk/s/MjBfMzQ1MDE5NjFf/Kusah-Huyu-hapa-820x545.jpg",
        uploadedAt: new Date("2025-07-31T08:00:00"),
        url: "https://od.lk/d/MjBfMzQ0OTQ2ODBf/Kusah%20-%20Huyu%20hapa.mp3",
        description: ""
      },
        {
        id: 7,
        title: "Makosa - Obby Alpha",
        cover: "https://od.lk/s/MjBfMzQ1MDE5NjNf/Obby-Alpha-MAKOSA-820x545.jpg",
        uploadedAt: new Date("2025-07-31T13:00:00"),
        url: "https://od.lk/d/MjBfMzQ1MDE5ODZf/Obby%20Alpha%20-%20MAKOSA.mp3",
        description: ""
      },
        {
        id: 8,
        title: "Lukamba - Kimya",
        cover: "https://od.lk/d/MjBfMzQ1MDIwMzFf/Lukamba-Kimya-820x545.jpg",
        uploadedAt: new Date("2025-08-05T21:50:00"),
        url: "https://od.lk/d/MjBfMzQ1MDE5OTdf/Lukamba%20-%20Kimya.mp3",
        description: ""
      },
        {
        id: 9,
        title: "B2K feat G Nako - We Umerogwa",
        cover: "https://od.lk/d/MjBfMzQ1MDIwMzBf/B2K-Feat-G-nako-_-We-Umerogwa-820x545.jpg",
        uploadedAt: new Date("2025-08-06T00:55:00"),
        url: "https://od.lk/d/MjBfMzQ1MDIwMjhf/B2K%20Feat%20G%20nako%20-%20We%20Umerogwa.mp3",
        description: ""
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

