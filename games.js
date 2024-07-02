document.addEventListener('DOMContentLoaded', () => {
    const games = [
        "root", "wingspan", "dixit", "fort", "honey buzz", "parks", "everdell", "horrified", 
        "catan", "arte moderno", "fit to print", "flamecraft", "king of new york", 
        "unstable unicorns", "cross clues", "cranium", "azul", "oath", "canvas", 
        "bitoku", "dodos riding dinos", "fun facts", "love letter", "carcassonne", 
        "patchwork doodle", "codenames duet", "the mind", "rummy", "domino mexicano", 
        "fog of love", "inhuman conditions", "maraton", "casino", "one night ultimate werewolf", 
        "nmbr 9", "arboretum", "arkham horror", "decrypto", "micromacro crime city", 
        "sea salt paper", "here to slay", "deep sea adventure", "mysterium", "don't get got", 
        "castles of burgundy", "salem 1692", "stuffed fables", "sushi go party!", "the game", 
        "scout", "herd mentality", "anomia", "avalon", "rabbit hole", "hitster", "wits and wagers", 
        "wavelengths", "werewords", "tokaido", "feria de las pulgas de titirilquén", 
        "El señor de los anillos LCG", "Imagine", "Lord of the rings journeys in middle earth", 
        "Evolution: Climate", "Fake Artist goes to New York", "Skull", "Ahoy!", 
        "7 wonders duel", "codenames", "just one", "unlock! heroic adventures", "7 wonders", 
        "star wars deck building game", "Tir na nog"
    ];

    const gamesList = document.getElementById('games-list');

    games.forEach(game => {
        fetch(`https://www.boardgamegeek.com/xmlapi2/search?query=${encodeURIComponent(game)}&type=boardgame`)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.getElementsByTagName("item");
                if (items.length > 0) {
                    const gameId = items[0].getAttribute("id");
                    fetch(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`)
                        .then(response => response.text())
                        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
                        .then(gameData => {
                            const gameInfo = gameData.getElementsByTagName("item")[0];
                            const gameName = gameInfo.getElementsByTagName("name")[0].getAttribute("value");
                            const gameDescription = gameInfo.getElementsByTagName("description")[0].textContent;
                            const minPlayers = gameInfo.getElementsByTagName("minplayers")[0].getAttribute("value");
                            const maxPlayers = gameInfo.getElementsByTagName("maxplayers")[0].getAttribute("value");
                            const playingTime = gameInfo.getElementsByTagName("playingtime")[0].getAttribute("value");
                            const imageUrl = gameInfo.getElementsByTagName("image")[0].textContent;
                            
                            const gameElement = document.createElement('div');
                            gameElement.classList.add('game');
                            gameElement.innerHTML = `
                                <img src="${imageUrl}" alt="${gameName}">
                                <h3>${gameName}</h3>
                                <p>${gameDescription.substring(0, 200)}...</p>
                                <div class="info">
                                    <span>Jugadores: ${minPlayers} - ${maxPlayers}</span>
                                    <span>Duración: ${playingTime} min</span>
                                </div>
                            `;
                            gamesList.appendChild(gameElement);
                        })
                        .catch(error => console.error('Error fetching game data:', error));
                }
            })
            .catch(error => console.error('Error fetching search data:', error));
    });
});
