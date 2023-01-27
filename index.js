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
const resultsDiv = document.getElementById('results');
const player1Div = document.getElementById('player1Score');
const player2Div = document.getElementById('player2Score');

// let gameMode = '';
let gameInfo = {
  playedRounds: 0,
  player1Score: 0,
  player2Score: 0,
  compScore: 0,
};
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
startGame();

function startGame() {
  selectionDiv.style.display = 'none';
  boardDiv.style.display = 'none';
  winningMessageDiv.style.display = '';
  player1Div.style.display = 'none';
  player2Div.style.display = 'none';
  gameInfoForm.style.display = 'none';
}
function continueGame() {
  winningMessageDiv.classList.remove('show');
  boardCells.forEach((cell) => {
    cell.innerText = '';
    cell.addEventListener('click', handleCellClick, { once: true });
    currentMark = 'X';
  });
  setCurrentPlayer();
}
function restartGame() {
  continueGame();
  gameInfo.playedRounds = 0;
  gameInfo.player1Score = 0;
  gameInfo.player2Score = 0;
  gameInfo.compScore = 0;
  resultsDiv.innerHTML = '';
  continueButton.style.display = '';
  updateScores();
  setCurrentPlayer();
}
function setCurrentPlayer() {
  if (currentMark === 'X') {
    player1Div.firstChild.style.backgroundColor = '#64748b ';
    player2Div.firstChild.style.backgroundColor = '';
  } else {
    player2Div.firstChild.style.backgroundColor = '#64748b ';
    player1Div.firstChild.style.backgroundColor = '';
  }
}
function updateScores() {
  player1Div.innerHTML = '';
  player2Div.innerHTML = '';
  player1Div.style.display = '';
  player2Div.style.display = '';
  const p = document.createElement('p');
  const player1Name = document.createElement('p');
  const player1Score = document.createElement('p');
  const player2Name = document.createElement('p');
  const player2Score = document.createElement('p');

  player1Name.innerText = gameInfo.player1;
  player2Name.innerText = gameInfo.player2;
  player1Score.innerText = gameInfo.player1Score;
  player2Score.innerText = gameInfo.player2Score;
  player1Div.appendChild(player1Name);
  player1Div.appendChild(player1Score);
  player2Div.appendChild(player2Name);
  player2Div.appendChild(player2Score);
}

quitButton.addEventListener('click', () => location.reload());
restartButton.addEventListener('click', restartGame);
continueButton.addEventListener('click', () => {
  if (gameInfo.playedRounds === gameInfo.rounds) {
    // Display the overall score for both Players
    continueButton.style.display = 'none';
    resultsDiv.style.display = '';
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const h1 = winningMessageDiv.querySelector('h1');
    let message = '';
    if (gameInfo.player1Score > gameInfo.player2Score) {
      message = `${gameInfo.player1} WINS`;
      h1.innerText = message;
    } else if (gameInfo.player1Score === gameInfo.player2Score) {
      message = `ITS A DRAW`;
      h1.innerText = message;
    } else {
      message = `${gameInfo.player2} WINS`;
      h1.innerText = message;
    }
    p1.innerText = `${gameInfo.player1} Score: ${gameInfo.player1Score}`;
    p2.innerText = `${gameInfo.player2} Score: ${gameInfo.player2Score}`;
    resultsDiv.appendChild(p1);
    resultsDiv.appendChild(p2);
    // Give an option to either quit or restart the game
  } else {
    continueGame();
  }
});

function playGame() {
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
      gameInfo.playedRounds += 1;
      updateScores();
    } else {
      winningMessageDiv.querySelector('h1').innerText = `${
        currentMark === 'X' ? gameInfo.player1 : gameInfo.player2
      } Wins!`;
      currentMark === 'X'
        ? (gameInfo.player1Score += 1)
        : (gameInfo.player2Score += 1);
      gameInfo.playedRounds += 1;
      updateScores();
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
    setCurrentPlayer();
  }

  return { swapTurns, isDraw, checkWin, endGame, placeMark };
}

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
  // selectionDiv.style.marginBottom = 'auto';
  // startDiv.querySelector('h1').remove();
});

gameModeButtons.forEach((button, index) => {
  gameInfo.gameMode = button.innerText;
  button.addEventListener('click', handleGameModeClick);
});

// get player details
gameInfoForm.addEventListener('submit', handleGameInfoInputForm);

function handleGameInfoInputForm(e) {
  e.preventDefault();
  const formData = e.target;
  const gameData = Object.fromEntries(new FormData(formData));
  gameInfo = { ...gameInfo, ...gameData };
  gameInfo.rounds = parseInt(gameData.rounds);

  formData.reset();
  gameInfoForm.style.display = 'none';
  // selectSymbolsDiv.style.display = '';
  boardDiv.style.display = '';
  player1Div.style.display = '';
  player2Div.style.display = '';

  gameModeButtons.forEach((button) => {
    button.style.cursor = 'not-allowed';
    // button.setAttribute('disabled', '');
    button.style.pointerEvents = 'none';
  });
  updateScores();
  setCurrentPlayer();
}

function handleGameModeClick() {
  // selectSymbolsDiv.style.display = 'none';
  // selectSymbolsDiv.style.display = '';
  if (gameInfo.gameMode === 'Computer') {
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
  // gameInfo.gameMode = gameMode;
}

function handleCellClick(e) {
  const { swapTurns, isDraw, checkWin, endGame, placeMark } = playGame();
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
  console.table(gameInfo);
}

boardCells.forEach((cell) => {
  cell.addEventListener('click', handleCellClick, { once: true });
});
