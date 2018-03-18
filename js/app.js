'use strict';
var cards = document.querySelectorAll(".card");
const theTimer = document.querySelector(".timer");

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
const star1 = document.getElementById("star1");
const star2 = document.getElementById("star2");
const star3 = document.getElementById("star3");
var twoCards = [];
var twoCells = [];
var matchCells = [];
var movesCount = 0;
var timer = [0, 0, 0, 0];
var interval;
var timerRunning = false;
var timeMessage = "";

/** Timer related functions */
function runTimer() {
    let currentTime = zeroCompletion(timer[0]) + ":" + zeroCompletion(timer[1]) + ":" + zeroCompletion(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3] / 100) / 60);
    timer[1] = Math.floor((timer[3] / 100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

function zeroCompletion(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
} /**End of timer */
document.querySelector(".restart").addEventListener("click", startNewGame, false);

function startNewGame() {
    theTimer.innerHTML = "00:00:00";
    timeMessage = "";
    clearInterval(interval);
    timer = [0, 0, 0, 0];
    document.querySelector(".moves").innerHTML = 0;
    fullStars();
    let newOrder = shuffle(cardIcons.concat(cardIcons));
    for (let i = 0; i < cards.length; i++) {
        cards[i].childNodes[1].classList.value = "fa " + newOrder[i];
    }

    showAllCards();

    setTimeout(() => {
        flipBackAll();
        play();
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }, 6000);
}

function play() {
    cards.forEach(function (card) {
        card.addEventListener("click", showCard, false);
    })

}

function fullStars() {
    star1.classList.value = "fa fa-star";
    star2.classList.value = "fa fa-star";
    star3.classList.value = "fa fa-star";
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
            cell.target.classList.value = "card open show match tada animated";
            if (twoCards[0] !== undefined) matchCells.push(twoCards[0]);
            if (twoCards[1] !== undefined) matchCells.push(twoCards[1]);
            nextTurn();
        });
    } else {

        twoCells.forEach(function (cell) {
            cell.target.classList.value = "card open show nomatch shake animated";
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
    movesCount += 1;
    document.querySelector(".moves").innerHTML = movesCount / 2;
    calculateStars();
}

function checkWin() {
    if (matchCells.length === 16) gameOver();
};

function gameOver() {
    timerRunning = false;
    clearInterval(interval);
    var inst = $('[data-remodal-id=modal2]').remodal();
    inst.open();
    createWinningMessage();
}

function createWinningMessage() {
    let moves = Math.round(movesCount / 2);

    let timeEstimated = document.querySelector(".timer").innerHTML;
    let splittedTime = timeEstimated.split(":");
    if (splittedTime[0] === "00") {
        timeMessage = `${Number(splittedTime[1])} seconds ${Number(splittedTime[2])} ms`;
    } else {
        timeMessage = `${Number(splittedTime[0])} minutes ${Number(splittedTime[1])} seconds ${Number(splittedTime[2])} ms`;
    }

    let stars = document.querySelectorAll(".fa-star");
    let starCount = stars.length;

    return `with ${moves} moves and ${starCount} stars in ${timeMessage}`
}

function calculateStars() {
    let fails = (movesCount - (matchCells.length));

    switch (fails) {
        case 8:
            star1.classList.value = "fa fa-star-o";
            break;
        case 16:
            star2.classList.value = "fa fa-star-o";
            break;
        case 20:
            star3.classList.value = "fa fa-star-o";
            break;
    }
}


function showAllCards() {
    // This function is used in every new game for 6 seconds
    for (let card of cards) {
        card.classList.value = "card show";
    }
}

function flipBackAll() {
    // Hide all cards to start the playing.
    for (const card of cards) {
        card.classList.value = "card";
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