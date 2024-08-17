/*-------------------------------- Constants --------------------------------*/
const messageEl = document.querySelector("#message");
const boardEl = document.querySelector(".board");
const resetBtnEl = document.querySelector("#reset");
const squareEls = document.querySelectorAll(".sqr");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner, tie;

/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
}

function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((cell, index) => {
    squareEls[index].textContent = cell;
  });
}

function updateMessage() {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn}'s turn!`;
  } else if (!winner && tie) {
    messageEl.textContent = "It's a tie!";
  } else {
    messageEl.textContent = `${turn} wins!`;
  }
}

function handleClick(event) {
  if (!event.target.classList.contains("sqr")) return;

  const squareIndex = parseInt(event.target.id);

  if (board[squareIndex] !== "" || winner) return;

  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}

function placePiece(index) {
  board[index] = turn;
}

function checkForWinner() {
  for (let combo of winningCombos) {
    if (
      board[combo[0]] !== "" &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[0]] === board[combo[2]]
    ) {
      winner = true;
      return;
    }
  }
}

function checkForTie() {
  if (winner) return;
  tie = !board.includes("");
}

function switchPlayerTurn() {
  if (winner) return;
  turn = turn === "X" ? "O" : "X";
}

/*----------------------------- Event Listeners -----------------------------*/
boardEl.addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);

init();
