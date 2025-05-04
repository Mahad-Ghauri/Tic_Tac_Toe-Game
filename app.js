let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let displayMessage = document.querySelector("#header-display");
let messageClass = document.querySelector(".display-message");
let newGameBtn = document.querySelector(".newGame-btn");
let scoreX = document.getElementById("score-x");
let scoreO = document.getElementById("score-o");
let turnText = document.getElementById("turn-text");
let closeModalBtn = document.getElementById("close-modal");
let modal = document.getElementById("modal");

let turnO = true;
let count = 0;
let scores = { X: 0, O: 0 };

// Optional: Sound effects (add your own mp3/ogg files in the project)
// const moveSound = new Audio('move.mp3');
// const winSound = new Audio('win.mp3');
// const drawSound = new Audio('draw.mp3');

const winPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];

function updateTurnText() {
    turnText.textContent = `Player ${turnO ? "O" : "X"}'s turn`;
}

function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        if (turnO) {
            box.innerText = "O";
            box.classList.add("filled-o");
            // moveSound?.play();
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("filled-x");
            // moveSound?.play();
            turnO = true;
        }
        box.disabled = true;
        count++;
        updateTurnText();
        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    displayMessage.innerText = `It's a draw!`;
    modal.classList.remove("hide");
    // drawSound?.play();
    disableButtons();
};

const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("filled-x", "filled-o");
    }
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let position1Value = boxes[pattern[0]].innerText;
        let position2Value = boxes[pattern[1]].innerText;
        let position3Value = boxes[pattern[2]].innerText;
        if (position1Value != "" && position2Value != "" && position3Value != "") {
            if (position1Value === position2Value && position2Value === position3Value) {
                showWinner(position1Value);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner) => {
    displayMessage.innerText = `Congratulations! The winner is ${winner}`;
    modal.classList.remove("hide");
    // winSound?.play();
    scores[winner]++;
    updateScores();
    disableButtons();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableButtons();
    modal.classList.add("hide");
    updateTurnText();
};

resetBtn.addEventListener("click", resetGame);
newGameBtn.addEventListener("click", resetGame);
closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hide");
});

// Initialize
updateScores();
updateTurnText();
modal.classList.add("hide");