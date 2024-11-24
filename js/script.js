const cards = [
    'img/characters/scorpion.png', 'img/characters/scorpion.png',
    'img/characters/jax.png', 'img/characters/jax.png',
    'img/characters/shao kahn.png', 'img/characters/shao kahn.png',
    'img/characters/kabal.png', 'img/characters/kabal.png',
    'img/characters/rambo.png', 'img/characters/rambo.png',
    'img/characters/noob saibot.png', 'img/characters/noob saibot.png',
    'img/characters/mileena.png', 'img/characters/mileena.png',
    'img/characters/nightwolf.png', 'img/characters/nightwolf.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
}

function createBoard() {
    const gameBoard = document.querySelector('.game-board');
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.icon = card;

        // Imagen oculta por defecto
        const cardImage = document.createElement('img');
        cardImage.src = card;
        cardImage.alt = 'Carta';
        cardImage.classList.add('hidden');

        cardElement.appendChild(cardImage);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flipped');

    const cardImage = this.querySelector('img');
    cardImage.classList.remove('hidden');

    if (!firstCard) {
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function unflipCard() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.querySelector('img').classList.add('hidden');
        secondCard.querySelector('img').classList.add('hidden');
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function checkForMatch() {
    if (firstCard.dataset.icon === secondCard.dataset.icon) {
        disableCard();
    } else {
        unflipCard();
    }
}
function disableCard() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}


function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false]
}

document.getElementById('reset-button').addEventListener('click', () => {
    document.querySelector('.game-board').innerHTML = '';
    createBoard();
});

createBoard();