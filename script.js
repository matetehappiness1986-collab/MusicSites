document.addEventListener('DOMContentLoaded', () => {

    const searchBar = document.getElementById('search-bar');
    const sectionsContainer = document.querySelector('.content');
    const mainContentView = document.getElementById('main-content-view');
    const songDetailsView = document.getElementById('song-details-view');
    const sectionTabs = document.getElementById('section-tabs');
    const themeToggle = document.querySelector('.theme-toggle');
    const menuToggle = document.querySelector('.menu-toggle');
    const backButton = document.getElementById('back-button');
    const suggestionsList = document.getElementById('autocomplete-suggestions');
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    // A place for you to add new songs.
    // Follow the format below.
    // You can copy and paste the object to add a new song.
    //
    // - For audios, add: audioUrl: 'path/to/your/song.mp3'
    // - For videos, add: videoUrl: 'path/to/your/video.mp4'
    // - For albums, add: downloadUrl: 'path/to/your/album.zip'
    //
    // The timestamp is automatically created when the page loads, but you can set it manually.
    const allSongs = [
        // --- SONGS ---
        { id: 1, type: 'audio', title: 'Eternal Echo', artist: 'The Luminary', cover: 'https://images.unsplash.com/photo-1544498539-c70e4e59c118', timestamp: new Date(Date.now() - 3 * 60 * 1000), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
        { id: 2, type: 'video', title: 'City of Dreams', artist: 'Urban Beats Collective', cover: 'https://images.unsplash.com/photo-1549495763-7e3e9154a8b7', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 3, type: 'audio', title: 'Crimson Sunset', artist: 'Amelia & The Sky', cover: 'https://images.unsplash.com/photo-1542382404-e3f4384b2569', timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { id: 4, type: 'audio', title: 'Whispering Winds', artist: 'Liam Carter', cover: 'https://images.unsplash.com/photo-1587593810167-a8a7605e5504', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
        { id: 5, type: 'video', title: 'The Road Less Traveled', artist: 'Journey Folk', cover: 'https://images.unsplash.com/photo-1517435282548-18e38466b595', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 6, type: 'audio', title: 'Midnight Serenade', artist: 'Lunar Sound', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', timestamp: new Date(Date.now() - 10 * 60 * 1000), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { id: 7, type: 'video', title: 'City Lights', artist: 'Urban Beats', cover: 'https://images.unsplash.com/photo-1506744038136-4133d1c1c1f5', timestamp: new Date(Date.now() - 5 * 60 * 1000), videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 8, type: 'audio', title: 'Golden Hour', artist: 'Aria Blue', cover: 'https://images.unsplash.com/photo-1544498539-c70e4e59c118', timestamp: new Date(Date.now() - 2 * 60 * 1000), audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' },
        { id: 9, type: 'video', title: 'Electric Dreams', artist: 'Synthwave Society', cover: 'https://images.unsplash.com/photo-1549495763-7e3e9154a8b7', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

        // --- ALBUMS ---
        { id: 10, type: 'album', title: 'The Forest Sessions', artist: 'Rainy Days', cover: 'https://images.unsplash.com/photo-1517435282548-18e38466b595', timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), downloadUrl: 'https://example.com/downloads/the-forest-sessions.zip' },
        { id: 11, type: 'album', title: 'Neon Nights', artist: 'The Synth Drifters', cover: 'https://images.unsplash.com/photo-1587593810167-a8a7605e5504', timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), downloadUrl: 'https://example.com/downloads/neon-nights.zip' },
        { id: 12, type: 'album', title: 'The Grand Odyssey', artist: 'Orchestra of the Stars', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', timestamp: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), downloadUrl: 'https://example.com/downloads/the-grand-odyssey.zip' },
    ];

    // Function to calculate time ago
    function timeAgo(date) {
        const seconds = Math.floor((new Date() - date) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " year" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " month" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        interval = seconds / 604800;
        if (interval > 1) return Math.floor(interval) + " week" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " day" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hour" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " min" + (Math.floor(interval) > 1 ? "s" : "") + " ago";
        return "Just now";
    }

    // Function to render songs into a grid/carousel
    function renderSongs(containerId, songs) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        songs.forEach(song => {
            const songCard = document.createElement('div');
            songCard.className = 'song-card';
            songCard.dataset.id = song.id;
            songCard.innerHTML = `
                <img src="${song.cover}" alt="${song.title} Cover" class="song-cover">
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">${song.artist}</div>
                    <div class="song-timestamp">${timeAgo(song.timestamp)}</div>
                </div>
            `;
            container.appendChild(songCard);
        });
    }

    // Function to show/hide sections
    function showSection(sectionId) {
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    }

    // Function to update active tab styling
    function updateActiveTab(tabId) {
        document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
        const tabToActivate = document.querySelector(`[data-section="${tabId}"]`);
        if (tabToActivate) tabToActivate.classList.add('active');
    }

    // Initial render of all content
    const recentlyAdded = allSongs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
    renderSongs('recently-added-content', recentlyAdded);
    renderSongs('home-content', allSongs);
    renderSongs('audios-content', allSongs.filter(s => s.type === 'audio'));
    renderSongs('videos-content', allSongs.filter(s => s.type === 'video'));
    renderSongs('albums-content', allSongs.filter(s => s.type === 'album'));

    // Main event listener for all song cards
    sectionsContainer.addEventListener('click', (e) => {
        const songCard = e.target.closest('.song-card');
        if (songCard) {
            const songId = parseInt(songCard.dataset.id);
            const song = allSongs.find(s => s.id === songId);
            if (song) {
                renderSongDetails(song);
            }
        }
    });

    // Function to render the single song details
    function renderSongDetails(song) {
        mainContentView.style.display = 'none';
        songDetailsView.style.display = 'block';
        document.getElementById('song-cover-img').src = song.cover;
        document.getElementById('song-cover-img').alt = `${song.title} Cover`;
        document.getElementById('song-details-title').textContent = song.title;
        document.getElementById('song-details-artist').textContent = song.artist;

        const playerContainer = document.getElementById('media-player-container');
        playerContainer.innerHTML = '';
        const downloadBtn = document.querySelector('.download-btn');
        downloadBtn.style.display = 'none'; // Hide by default

        if (song.type === 'audio') {
            const audioPlayer = document.createElement('audio');
            audioPlayer.controls = true;
            audioPlayer.src = song.audioUrl;
            playerContainer.appendChild(audioPlayer);
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = () => window.location.href = song.audioUrl;
        } else if (song.type === 'video') {
            const videoPlayer = document.createElement('video');
            videoPlayer.controls = true;
            videoPlayer.src = song.videoUrl;
            playerContainer.appendChild(videoPlayer);
            downloadBtn.style.display = 'inline-block';
            downloadBtn.onclick = () => window.location.href = song.videoUrl;
        } else if (song.type === 'album') {
            playerContainer.innerHTML = '<p>This is a complete album. Click download to get all songs!</p>';
            if (song.downloadUrl) {
                downloadBtn.style.display = 'inline-block';
                downloadBtn.onclick = () => window.location.href = song.downloadUrl;
            }
        }
        document.querySelector('.search-section').style.display = 'none';
    }

    // Back button to return to main view
    backButton.addEventListener('click', () => {
        mainContentView.style.display = 'block';
        songDetailsView.style.display = 'none';
        document.querySelector('.search-section').style.display = 'block';
    });

    // Section Switching Logic
    sectionTabs.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            const section = e.target.dataset.section;
            showSection(section);
            updateActiveTab(section);
            if (window.innerWidth <= 768) {
                sectionTabs.classList.remove('visible');
            }
        }
    });

    // Theme and Menu Toggling Logic
    menuToggle.addEventListener('click', () => {
        sectionTabs.classList.toggle('visible');
    });

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.querySelector('i').className = 'fas fa-moon';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.querySelector('i').className = 'fas fa-sun';
        }
    });

    // Search and Autocomplete Logic
    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        
        if (query.length > 0) {
            const filteredSuggestions = allSongs.filter(song =>
                song.title.toLowerCase().includes(query) ||
                song.artist.toLowerCase().includes(query)
            );
            
            suggestionsList.innerHTML = '';
            filteredSuggestions.slice(0, 5).forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist}`;
                li.addEventListener('click', () => {
                    searchBar.value = `${song.title} - ${song.artist}`;
                    suggestionsList.style.display = 'none';
                    filterContent(query);
                });
                suggestionsList.appendChild(li);
            });
            suggestionsList.style.display = 'block';
            filterContent(query);
        } else {
            suggestionsList.style.display = 'none';
            const activeSectionId = document.querySelector('.tab-item.active').dataset.section;
            let songsToDisplay;
            if (activeSectionId === 'home') {
                renderSongs('recently-added-content', recentlyAdded);
                songsToDisplay = allSongs;
            } else {
                songsToDisplay = allSongs.filter(s => s.type === activeSectionId.slice(0, -1));
            }
            renderSongs(`${activeSectionId}-content`, songsToDisplay);
        }
    });

    function filterContent(query) {
        const activeSectionId = document.querySelector('.tab-item.active').dataset.section;
        let songsToFilter;
        if (activeSectionId === 'home') {
            songsToFilter = allSongs;
        } else if (activeSectionId === 'audios') {
            songsToFilter = allSongs.filter(s => s.type === 'audio');
        } else if (activeSectionId === 'videos') {
            songsToFilter = allSongs.filter(s => s.type === 'video');
        } else if (activeSectionId === 'albums') {
            songsToFilter = allSongs.filter(s => s.type === 'album');
        } else {
            songsToFilter = [];
        }

        const filteredSongs = songsToFilter.filter(song =>
            song.title.toLowerCase().includes(query) ||
            song.artist.toLowerCase().includes(query)
        );

        const contentContainer = document.getElementById(`${activeSectionId}-content`);
        if (contentContainer) {
            renderSongs(contentContainer.id, filteredSongs);
        }
    }

    // New scroll logic for the header
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }
        lastScrollY = window.scrollY;
    });
});
