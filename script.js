let header = $('h1');
const playersBtn = $('#players_btn');
const themeBtn = $('.fa-palette');
const restartBtn = $('.fa-arrow-rotate-left');
const boxes = Array.from($('.box'));

// Themes
themeBtn.on('click', changeTheme);
let i = 0;
function changeTheme() {
  let body = document.querySelector('body');
  const classicLight = () => {
    body.style.setProperty('--bg-color', '#f2e9e4');
    body.style.setProperty('--main-color', '#4a4e69');
    body.style.setProperty('--top-color', '#c9ada7');
    body.style.setProperty('--points-color', '#22223B');
    body.style.setProperty('--xo-color', '#9A8C98');
  }
  const classicDark = () => {
    body.style.setProperty('--bg-color', '#212529');
    body.style.setProperty('--main-color', '#dee2e6');
    body.style.setProperty('--top-color', '#6c757d');
    body.style.setProperty('--points-color', '#f8f9fa');
    body.style.setProperty('--xo-color', '#adb5bd');
  }
  const nature = () => {
    body.style.setProperty('--bg-color', '#DDE5B6');
    body.style.setProperty('--main-color', '#6C584C');
    body.style.setProperty('--top-color', '#ADC178');
    body.style.setProperty('--points-color', '#A98467');
    body.style.setProperty('--xo-color', '#fb6f92');
  }
  const themes = [classicLight, classicDark, nature];
  if (i < themes.length) {
    i++;
  }
  if (i >= themes.length){
    i = 0;
  }
  themes[i]();
}

const X = "X";
const O = "O";
let currentPlayer = X;
let playsFirst = X;
let gameBoardArr = Array(9).fill(null);
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8]
];
let p1Pts = parseInt($('#player1_points').text());
let p2Pts = parseInt($('#player2_points').text());
let drawPts = parseInt($('#tied_points').text());
let roundOver = false;

// Game mode
let gameMode = "twoPlayer";

/* playersBtn.on('click', onePlayerModeAlert);
function onePlayerModeAlert() {
  alert("Single-Player Mode Coming Soon!");
} */
playersBtn.on('click', setGameMode); // switches between 1P 2P game modes
function setGameMode() {
  restartGame();
  if (gameMode === "twoPlayer") {
    document.querySelector("#twoP").style.display = "none";
    document.querySelector("#oneP").style.display = "block";
  } else if (gameMode === "singlePlayer") {
    document.querySelector("#oneP").style.display = "none";
    document.querySelector("#twoP").style.display = "block";
  }
  gameMode = gameMode === "twoPlayer" ? "singlePlayer" : "twoPlayer";
}

const startGame = () => {
  document.querySelector("#start-new-round").style.display = "none";
  document.querySelector("#block-human-player").style.display = "none";
  currentPlayer = playsFirst;
  roundOver = false;
  initializedWin = false, winAttemptIndex = 0; //so comp can initialize win
  boxes.forEach(box => box.innerText = '');
  gameBoardArr.fill(null);
  boxes.forEach(box => box.removeEventListener('click', boxClicked));
  boxes.forEach(box => box.addEventListener('click', boxClicked, {once: true}));
  header.text('Tic Tac Toe');

  if (gameMode == "singlePlayer" && playsFirst === O) {
    setTimeout(computerPlay, 500);
    randomWinningCombo = winningCombos[Math.floor(Math.random() * 8)];
  }
}

startGame();

restartBtn.on('click', restartGame);
function restartGame() {
  boxes.forEach(box => box.innerText = '');
  gameBoardArr.fill(null);
  boxes.forEach(box => box.addEventListener('click', boxClicked, {once: true}));
  document.querySelector("#block-human-player").style.display = "none";
  currentPlayer = X;
  playsFirst = X;
  initializedWin = false, winAttemptIndex = 0; //so comp can initialize win
  header.text('Tic Tac Toe');

  p1Pts = 0;
  p2Pts = 0;
  drawPts = 0;
  document.getElementById("player1_points").innerHTML = p1Pts;
  document.getElementById("player2_points").innerHTML = p2Pts;
  document.getElementById("tied_points").innerHTML = drawPts;
  // console.log(gameBoardArr);
}


function boxClicked(e) {
  let boxID = e.target.id;
  e.target.innerText = currentPlayer; 
  gameBoardArr[boxID] = currentPlayer; 
  nullIndices = [];

  if (checkForWin(currentPlayer) && roundOver == false) {
    document.getElementById("game_header").innerHTML = `${currentPlayer} has won!`;   
    increaseScore(currentPlayer);
    endRound(); /* makes roundOver = true */
    return;
  } else if (checkForDraw() && roundOver == false) {
    document.getElementById("game_header").innerHTML = 'Draw!';
    addDraw();
    endRound();
    return;
  }
  
  currentPlayer = currentPlayer === X ? O : X;

  //console.log(`current is ${currentPlayer}`);
  singlePlayerMode();
}

function singlePlayerMode() {
  if (gameMode === "singlePlayer" && currentPlayer === O) {
    document.querySelector("#block-human-player").style.display = "block"; // prevents human player from playing during the computer's turn
    setTimeout(computerPlay, 400);
  } else if (gameMode === "singlePlayer" && currentPlayer === X) {
    document.querySelector("#block-human-player").style.display = "none";
  } 
}

function checkForWin(currentPlayer) {
  return winningCombos.some(combo => {
    return combo.every(i => gameBoardArr[i] === currentPlayer);
  });
}

function checkForDraw() {
  let checkDrawArr = [];
  gameBoardArr.forEach(e => {
    if (e === "X" || e === "O") {
      checkDrawArr.push(e);
    }
  } )
  if (checkDrawArr.length === 9) {
    return true;
  }
}

function increaseScore(currentPlayer){
  if (currentPlayer === X){
    p1Pts = parseInt(p1Pts) + 1;
    document.getElementById("player1_points").innerHTML = p1Pts;
  } else if (currentPlayer === O){
    p2Pts = parseInt(p2Pts) + 1;
    document.getElementById("player2_points").innerHTML = p2Pts;
  }
}

function addDraw() {
  drawPts = parseInt(drawPts) + 1;
  document.getElementById("tied_points").innerHTML = drawPts;
}

function endRound() {
  roundOver = true;
  document.querySelector("#block-human-player").style.display = "none";
  document.querySelector("#start-new-round").style.display = "block";
  document.getElementById("start-new-round").addEventListener('click', startGame);
  playsFirst = playsFirst === X ? O : X;
}
