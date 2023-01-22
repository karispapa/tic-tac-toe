// game, player or gameboard objects

const selectionDiv = document.getElementById('selection');
const startDiv = document.getElementById('start');
const boardDiv = document.getElementById('board');
const winningMessageDiv = document.getElementById('winning-message');
// const symbolTag = document.getElementById('symbols').querySelectorAll('p');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart');
const quitButton = document.getElementById('quit');
const continueButton = document.getElementById('continue');
const gameInfoForm = document.getElementById('game-info');
// const selectSymbolsDiv = document.getElementById('select-symbol');
const gameModeElement = document.getElementById('game-mode');
const gameModeButtons = gameModeElement.querySelectorAll('button');
const boardCells = boardDiv.querySelectorAll('[data-cell]');

selectionDiv.style.display = 'none';
boardDiv.style.display = 'none';
winningMessageDiv.style.display = '';
// selectSymbolsDiv.style.display = 'none';
gameInfoForm.style.display = 'none';

// let gameMode = '';
let gameInfo = {};
let currentMark = 'X';

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playGame() {}

function gameboard() {}

function player() {}

/*
symbolTag.forEach((symbol) => {
  symbol.addEventListener(
    'click',
    () => {
      // console.log(symbol.innerText);
      gameInfo.compSymbol = 'X';
      gameInfo.player1Symbol = symbol.innerText;
      if (gameInfo.gameMode === 'Two Players') {
        gameInfo.player2Symbol = symbol.innerText === 'X' ? 'O' : 'X';
        gameInfo.compSymbol = '';
      } else {
        gameInfo.player2Symbol = '';
        gameInfo.player1Symbol = 'O';
      }
      symbol.style.cursor = 'not-allowed';
      symbol.style.backgroundColor = '#64748b';

      if (symbol.innerText === 'X') {
        symbolTag[1].style.pointerEvents = 'none';
        // symbolTag[1].style.cursor = 'not-allowed';
      } else if (symbol.innerText === 'O') {
        symbolTag[0].style.pointerEvents = 'none';
        // symbolTag[0].style.cursor = 'not-allowed';
      }
      console.table(gameInfo);
    },
    { once: true }
  );
});
*/
startButton.addEventListener('click', function () {
  selectionDiv.style.display = '';
  startButton.style.display = 'none';
  selectionDiv.style.marginBottom = 'auto';
  // startDiv.querySelector('h1').remove();
});

gameModeButtons.forEach((button, index) => {
  button.addEventListener('click', function () {
    const gameMode = button.innerText;
    // selectSymbolsDiv.style.display = 'none';
    // selectSymbolsDiv.style.display = '';
    if (gameMode === 'Computer') {
      gameModeButtons[0].style.backgroundColor = '#446172';
      gameModeButtons[1].style.backgroundColor = '#0c4a6e';

      document
        .querySelectorAll('[data-player2]')
        .forEach((el) => (el.style.display = 'none'));
      // gameModeButtons[1].style.cursor = 'not-allowed';
      // gameModeButtons[1].setAttribute('disabled', '');
    } else {
      gameModeButtons[1].style.backgroundColor = '#45895c';
      gameModeButtons[0].style.backgroundColor = '#0c4a6e';

      document
        .querySelectorAll('[data-player2]')
        .forEach((el) => (el.style.display = ''));
      // gameModeButtons[0].style.cursor = 'not-allowed';
      // gameModeButtons[0].setAttribute('disabled', '');
    }
    gameInfoForm.style.display = '';
    gameInfo.gameMode = gameMode;
    console.log(gameMode);
  });
});

// get player details
gameInfoForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const formData = e.target;
  const gameData = Object.fromEntries(new FormData(formData));
  gameInfo = { ...gameInfo, ...gameData };

  formData.reset();
  gameInfoForm.style.display = 'none';
  // selectSymbolsDiv.style.display = '';
  boardDiv.style.display = '';

  gameModeButtons.forEach((button) => {
    button.style.cursor = 'not-allowed';
    // button.setAttribute('disabled', '');
    button.style.pointerEvents = 'none';
  });
});

// function setCurrentMark() {
//   gameInfo.gameMode === 'Computer'
//     ? (currentMark = gameInfo.compSymbol)
//     : (currentMark = gameInfo.player1Symbol);
// }

function handleCellClick(e) {
  const cell = e.target;
  placeMark(cell, currentMark);
  if (checkWin(currentMark)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
  // swapTurns();
}

function placeMark(cell, currentMark) {
  // cell.classList.add(currentClass);
  cell.innerText = currentMark;
}

function checkWin(currentMark) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return boardCells[index].innerText === currentMark;
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageDiv.querySelector('h1').innerText = 'Draw!';
  } else {
    winningMessageDiv.querySelector('h1').innerText = `${
      currentMark === 'X' ? "X's" : "O's"
    } Wins!`;
  }
  // winningMessageElement.classList.add('show');
  winningMessageDiv.classList.add('show');
}

function isDraw() {
  return [...boardCells].every((cell) => {
    return cell.innerText === 'X' || cell.innerText === 'O';
  });
}

function swapTurns() {
  currentMark === 'X' ? (currentMark = 'O') : (currentMark = 'X');
}

boardCells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick, { once: true });
});
