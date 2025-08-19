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
    const shareButton = document.querySelector('.share-btn');
    let lastScrollY = window.scrollY;
    let currentSong = null;

    // A place for you to add new songs.
    const allSongs = [
        // ============ RECENT AUDIO SONGS (last 24 hours) ============
        { id: 1, type: 'audio',
          title: 'Dogo Rema X Trechyson Molly Vx', 
          artist: 'My Everything Amapiano Remake',
          cover: 'https://od.lk/d/MjBfMzQ0OTQ2OTlf/Screenshots_2025-08-05-02-27-44.png',
          timestamp: new Date('2025-08-19T04:35:00Z'),
          tags: ['acoustic', 'chill', 'folk'],
          recommended: true, 
          audioUrl: 'https://od.lk/d/MjBfMzQ0OTQ2Njlf/Dogo_Rema_X_Trechyson_Molly_Vx_My_everything_Amapiano_Remake.mp3' },
        { id: 2, type: 'audio', title: 'City of Echoes', artist: 'Urban Beats Collective', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', timestamp: new Date('2025-08-19T04:15:00Z'), tags: ['lofi', 'upbeat', 'hip-hop'], audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { id: 3, type: 'audio', title: 'Electric Dreams', artist: 'Synthwave Society', cover: 'https://images.unsplash.com/photo-1542382404-e3f4384b2569', timestamp: new Date('2025-08-18T20:00:00Z'), tags: ['synthwave', 'upbeat'], recommended: true, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },

        // ============ RECENT VIDEOS (last 24 hours) ============
        { id: 4, type: 'video', title: 'Golden Hour Drive', artist: 'Sunset Drive', cover: 'https://images.unsplash.com/photo-1506744038136-4133d1c1c1f5', timestamp: new Date('2025-08-19T03:55:00Z'), tags: ['driving', 'upbeat', 'indie'], videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        { id: 5, type: 'video', title: 'Rainy Days', artist: 'The Droplets', cover: 'https://images.unsplash.com/photo-1517435282548-18e38466b595', timestamp: new Date('2025-08-19T03:40:00Z'), tags: ['chill', 'instrumental'], recommended: true, videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },

        // ============ OLDER CONTENT (past week) ============
        { id: 6, type: 'audio', title: 'Lost in the Woods', artist: 'Nature Sounds', cover: 'https://images.unsplash.com/photo-1549495763-7e3e9154a8b7', timestamp: new Date('2025-08-12T10:00:00Z'), tags: ['ambient', 'folk'], recommended: true, audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
        { id: 7, type: 'video', title: 'The Road Less Traveled', artist: 'Journey Folk', cover: 'https://images.unsplash.com/photo-1587593810167-a8a7605e5504', timestamp: new Date('2025-08-08T15:30:00Z'), tags: ['indie', 'folk'], videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        
        // ============ ALBUMS (past month and older) ============
        { id: 8, type: 'album', title: 'The Grand Odyssey', artist: 'Orchestra of the Stars', cover: 'https://images.unsplash.com/photo-1517435282548-18e38466b595', timestamp: new Date('2025-07-25T11:00:00Z'), tags: ['instrumental', 'classical'], recommended: true, downloadUrl: 'https://example.com/downloads/the-grand-odyssey.zip' },
        { id: 9, type: 'album', title: 'Neon Nights', artist: 'The Synth Drifters', cover: 'https://images.unsplash.com/photo-1587593810167-a8a7605e5504', timestamp: new Date('2025-07-10T09:00:00Z'), tags: ['synthwave', 'upbeat', 'lofi'], downloadUrl: 'https://example.com/downloads/neon-nights.zip' },
        { id: 10, type: 'album', title: 'The Forest Sessions', artist: 'Rainy Days', cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', timestamp: new Date('2025-06-20T14:00:00Z'), tags: ['ambient', 'chill', 'instrumental'], downloadUrl: 'https://example.com/downloads/the-forest-sessions.zip' },
        { id: 11, type: 'album', title: 'Acoustic Harmonies', artist: 'Quiet Moments', cover: 'https://images.unsplash.com/photo-1549495763-7e3e9154a8b7', timestamp: new Date('2025-04-15T18:00:00Z'), tags: ['acoustic', 'folk'], downloadUrl: 'https://example.com/downloads/acoustic-harmonies.zip' },
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

    // Initial render of home page content
    function initialRender() {
        const recentlyAdded = allSongs.sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
        renderSongs('recently-added-content', recentlyAdded);
        renderSongs('home-content', allSongs);
        renderSongs('audios-content', allSongs.filter(s => s.type === 'audio'));
        renderSongs('videos-content', allSongs.filter(s => s.type === 'video'));
        renderSongs('albums-content', allSongs.filter(s => s.type === 'album'));
    }
    
    initialRender();

    // Main event listener for all song cards
    sectionsContainer.addEventListener('click', (e) => {
        const songCard = e.target.closest('.song-card');
        if (songCard) {
            const songId = parseInt(songCard.dataset.id);
            const song = allSongs.find(s => s.id === songId);
            if (song) {
                currentSong = song; // Store the current song
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
        downloadBtn.style.display = 'none';

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

    // Share Button Logic
    shareButton.addEventListener('click', async () => {
        if (!currentSong) return;

        const shareData = {
            title: `${currentSong.title} by ${currentSong.artist}`,
            text: `Check out "${currentSong.title}" by ${currentSong.artist} on My Music Site!`,
            url: window.location.href // This gets the current URL
        };

        try {
            // Use the Web Share API if supported
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                // Fallback for browsers that don't support the API
                await navigator.clipboard.writeText(shareData.url);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Share failed:', err);
        }
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
            if (activeSectionId === 'home') {
                initialRender();
            } else {
                let songsToDisplay = allSongs.filter(s => s.type === activeSectionId.slice(0, -1));
                renderSongs(`${activeSectionId}-content`, songsToDisplay);
            }
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
