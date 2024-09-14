const animes = [
    {
        title: 'Attack on Titan',
        altNames: ['Shingeki no Kyojin', 'SNK'],
        image: 'image/snk.jpg',
        url: 'attack-on-titan.html'
    },
    {
        title: 'One Piece',
        altNames: ['One Piece Red'],
        image: 'image/one piece logo.png',
        url: '/One piece/One piece.html'
    },
    {
        title: 'Jujustu Kaisen',
        altNames: ['JJk'],
        image: 'image/jujutsu kaisen.jpg',
        url: '/Jujustu-Kaisen/Jujustu Kaisen.html'
    },
    {
        title: 'Your Name',
        altNames: ['Kimi no na WA'],  
        image: 'image/your name.jpeg',
        url: '/Your name/your name.html'
    },
    {
        title: 'Le voyage de Chihiro',
        altNames: ['SPIRITED AWAY', ' SEN TO CHIHIRO NO KAMIKAKUSHI', 'GHIBLI'],
        image: 'image/le-voyage-de-chihiro.jpg',
        url: '/Le voyage de chihiro/Le voyage de chihiro.html'
    },
    {
        title: 'Le château ambulant',
        altNames: ['Le château ambulant', ' HOWL S MOVING CASTLE', 'GHIBLI', 'HOWL NO UGOKU SHIRO,', ' HOWLS MOVING CASTLE'],
        image: 'image/lechateauambulant.jpg',
        url: '/Le château ambulant/Le château ambulant.html'
    },
    {
        title: 'Mon Voisin Totoro',
        altNames: ['GHIBLI', 'TONARI NO TOTORO '],
        image: 'image/Totoro.jpg',
        url: '/Tororo/Tororo.html'
    },
    {
        title: 'Death Note',
        altNames: [],
        image: 'image/death note1.jpeg',
        url: '/Death Note/Death Note.html'
    },
    {
        title: 'Assassination Classroom',
        altNames: ['ANSATSU KYOUSHITSU'],
        image: 'image/assination-classroom.jpg',
        url: '/Assassination Classroom/Assassination Classroom.html'
    },
    {
        title: 'The Promised Neverland',
        altNames: ['YAKUSOKU NO NEVERLAND', ' TPN'],
        image: 'image/promised neverland.jpg',
        url: '/The Promised Neverland/The Promised Neverland.html'
    },
    {
        title: 'Cyberpunk:Edgerunners',
        altNames: ['Cyberfunk'],
        image: 'image/cyberpunk.png',
        url: '/Cyberpunk Edgerunners/Cyberpunk Edgerunners.html'
    },
    // Ajoutez d'autres animes ici, avec ou sans noms alternatifs
];


function filterAnimes() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const resultsList = document.getElementById('resultsList');
    const searchBar = document.querySelector('.barrerecherche');

    // Effacer les résultats précédents
    resultsList.innerHTML = '';

    // Positionner la liste des résultats juste en dessous de la barre de recherche
    const rect = searchBar.getBoundingClientRect();
    const offset = 0; // Ajuste cette valeur pour décaler à gauche
    resultsList.style.position = 'absolute';
    resultsList.style.top = `${rect.bottom}px`;
    resultsList.style.left = `${rect.left - offset}px`;
    resultsList.style.width = `${rect.width}px`;
    resultsList.style.display = 'block'; // Afficher la liste des résultats

    // Filtrer les animes en fonction de l'entrée
    const filteredAnimes = animes.filter(anime => {
        // Vérifier si le titre ou un des noms alternatifs correspond à l'entrée
        return anime.title.toLowerCase().startsWith(filter) ||
               anime.altNames.some(altName => altName.toLowerCase().startsWith(filter));
    }).slice(0, 5);

    // Afficher les résultats filtrés
    filteredAnimes.forEach(anime => {
        const li = document.createElement('li');
        li.style.display = 'flex'; // Pour aligner l'image et le texte côte à côte
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px'; // Espacement entre les résultats

        // Créer un lien vers la page de l'anime
        const link = document.createElement('a');
        link.href = anime.url;
        link.style.textDecoration = 'none'; // Supprime le soulignement du lien
        link.style.display = 'flex';
        link.style.alignItems = 'center';

        // Créer l'élément image
        const img = document.createElement('img');
        img.src = anime.image;
        img.alt = anime.title;
        img.style.width = '60px'; // Largeur de l'image
        img.style.height = '60px'; // Conserver les proportions
        img.style.marginRight = '20px'; // Espacement entre l'image et le texte

        // Créer l'élément titre
        const title = document.createElement('div');
        title.classList.add('result-title');
        title.textContent = anime.title;

        // Assembler les éléments
        link.appendChild(img); // Ajouter l'image au lien
        link.appendChild(title); // Ajouter le titre au lien
        li.appendChild(link); // Ajouter le lien à l'élément de liste
        resultsList.appendChild(li); // Ajouter l'élément de liste aux résultats
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const resultsList = document.getElementById('resultsList');

    // Hide search results when clicking outside the search bar
    document.addEventListener('click', function (event) {
        if (!searchInput.contains(event.target) && !resultsList.contains(event.target)) {
            resultsList.style.display = 'none';
        }
    });

    // Show search results when clicking on the search bar
    searchInput.addEventListener('click', function () {
        if (resultsList.innerHTML !== '') {
            resultsList.style.display = 'block';
        }
    });

    // Update search results as user types
    searchInput.addEventListener('input', filterAnimes);
});







// script.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('episodes.json')
        .then(response => response.json())
        .then(data => {
            const episodeList = document.getElementById('episode-list');
            data.forEach(episode => {
                const article = document.createElement('article');
                article.className = 'episode';
                article.innerHTML = `
                    <h2>${episode.title}</h2>
                    <p>${episode.description}</p>
                    <a href="${episode.link}">Watch ${episode.title}</a>
                `;
                episodeList.appendChild(article);
            });
        })
        .catch(error => console.error('Error loading episodes:', error));
});


const episodeSelect = document.getElementById('episode-select');
const videoIframe = document.getElementById('video-iframe');
const prevButton = document.getElementById('prev-episode');
const lastButton = document.getElementById('last-episode');
const nextButton = document.getElementById('next-episode');

function updateVideo() {
    const selectedEpisode = episodeSelect.value;
    videoIframe.src = episodeUrls[selectedEpisode];
}

episodeSelect.addEventListener('change', updateVideo);

prevButton.addEventListener('click', function() {
    if (episodeSelect.selectedIndex > 0) {
        episodeSelect.selectedIndex--;
        updateVideo();
    }
});

nextButton.addEventListener('click', function() {
    if (episodeSelect.selectedIndex < episodeSelect.options.length - 1) {
        episodeSelect.selectedIndex++;
        updateVideo();
    }
});

lastButton.addEventListener('click', function() {
    episodeSelect.selectedIndex = episodeSelect.options.length - 1;
    updateVideo();
});

// Initialiser la vidéo au premier épisode
updateVideo();

