let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let displayMessage = document.querySelector("#header-display");
let messageClass = document.querySelector(".display-message");
let newGameBtn = document.querySelector(".newGame-btn");

let turnO = true;
let count = 0;

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

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("The box was clicked");
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    displayMessage.innerText = `The game is a draw`;
    messageClass.classList.remove("hide");
    disableButtons();
};

const disableButtons = () => {
    for (box of boxes) {
        box.disabled = true;
    }
};

const enableButtons = () => {
    for (box of boxes) {
        box.disabled = false;
        box.innerText = "";
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
    displayMessage.innerText = `Congratulations!!! the winner of the game is ${winner}`;
    messageClass.classList.remove("hide");
    disableButtons();
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableButtons();
    messageClass.classList.add("hide");
};


resetBtn.addEventListener("click" , resetGame);
newGameBtn.addEventListener("click" , resetGame);