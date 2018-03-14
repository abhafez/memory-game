var cards = document.querySelectorAll(".card");

var cardIcons = [
    "fa-diamond",
    "fa-paper-plane-o",
    "fa-anchor",
    "fa-bolt",
    "fa-cube",
    "fa-leaf",
    "fa-bicycle",
    "fa-bomb"
];

var twoCards = [];
var twoCells = [];
var matchCells = [];
var count = 0;

document.querySelector(".restart").addEventListener("click", startNewGame, false);

function startNewGame() {
    pair = [];
    match = [];
    newOrder = shuffle(cardIcons.concat(cardIcons));
    for (let i = 0; i < cards.length; i++) {
        cards[i].childNodes[1].classList.value = "fa " + newOrder[i];
    }

    showAllCards();


    setTimeout(() => {
        flipBackAll();
        play();
    }, 2000);
    // todo: make 6000 before submit.
}

function play() {
    cards.forEach(function (card) {
        card.addEventListener("click", showCard, false);
    })
}

function showCard(cell) {
    cell.target.classList.value = "card open show";
    cell.target.removeEventListener("click", showCard, false);
    twoCells.push(cell);
    twoCards.push(cell.target.childNodes[1].classList[1]);
    if (twoCards.length === 2) checkTwoCards();
}

function checkTwoCards() {
    if (twoCards[0] === twoCards[1]) {
        twoCells.forEach(function (cell) {
            cell.target.classList.value = "card open show match";
            if (twoCards[0] !== undefined) matchCells.push(twoCards[0]);
            if (twoCards[0] !== undefined) matchCells.push(twoCards[1]);
            nextTurn();
        });
    } else {

        twoCells.forEach(function (cell) {
            setTimeout(() => {
                cell.target.addEventListener("click", showCard, false);
                cell.target.classList.value = "card";
            }, 500); {}
            nextTurn();
        });
    }
}

function nextTurn() {
    checkWin();
    twoCards = [];
    twoCells = [];
    count += 1;
    document.querySelector(".moves").innerHTML = count / 2;
}

function checkWin() {
    if (matchCells.length === 16) gameOver();
};

function gameOver() {

}

function showAllCards() {
    // This function is used in every new game for 6 seconds
    for (let card of cards) {
        card.classList.value = "card show";
    }
}

function flipBackAll() {
    // Hide all cards to start the game.
    for (const card of cards) {
        console.log(card.classList.value = "card");
    }
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}