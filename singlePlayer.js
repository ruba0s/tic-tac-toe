function computerPlay() {
  if (currentPlayer === O) {
    placeOWin();
  }
  if (currentPlayer === O) {
    blockXWin();
  }
  if (currentPlayer === O && initializedWin === false) {
    initializeOWin();
    console.log('omfg initializedOWin');
  } else if (currentPlayer === O && initializedWin === true) {
    continueOWin();
    console.log('continueOWin');
  } 
  checkIfInitializedWin();
  console.log(initializedWin);
  if (currentPlayer === O && initializedWin === false) {
    initializeOWin();
    console.log('initializedOWin pt 2');
  } 
  if (currentPlayer === O) {
    let randomNumber = Math.floor(Math.random() * 9);
    while (gameBoardArr[randomNumber] != null) {
      randomNumber = Math.floor(Math.random() * 9); //change random number if space is already taken
    }
    document.getElementById(String(randomNumber)).click();
    currentPlayer = X;
    console.log('random');
  }
}

function blockXWin() {
  let countXs = 0, xBlockingCombo;
  for (const combo of winningCombos) {
    for (let i = 0; i < combo.length; i++) {
      if (gameBoardArr[combo[i]] == X) {
        countXs++;
      } else if (gameBoardArr[combo[i]] == O) 
        break;
      if (countXs >= 2) {
        xBlockingCombo = combo;
        break; 
      }
    }
    if (countXs >= 2) {
      break; 
    } else {
      countXs = 0;
      continue;
    }
  }
  
  if (countXs == 2) {
    for (const i of xBlockingCombo) {
      if (gameBoardArr[i] == null) {
          document.getElementById(String(i)).click();
          currentPlayer = X;
          break;
      }
    }
  }
}

function placeOWin() {
  let countOs = 0, oWinningCombo;
  for (const combo of winningCombos) {
    for (let i = 0; i < combo.length; i++) {
      if (gameBoardArr[combo[i]] == O) {
        countOs++;
      } else if (gameBoardArr[combo[i]] == X) 
        break;
      if (countOs >= 2) {
        oWinningCombo = combo;
        break; 
      }
    }
    if (countOs >= 2) {
      break; 
    } else {
      countOs = 0;
      continue;
    }
  }

  if (countOs == 2) {
    for (const i of oWinningCombo) {
      if (gameBoardArr[i] == null) {
        document.getElementById(String(i)).click();
        currentPlayer = X;
        break;
      }
    }
  }
}

let initializedWin = false; //has the comp already initialized a win?
let randomWinningCombo = winningCombos[Math.floor(Math.random() * 8)];
let winAttemptIndex = 0;
let nullCount = 0;

function initializeOWin() {
    for (let i = 0; i < 3; i++) {
      console.log(randomWinningCombo);
      if (gameBoardArr[randomWinningCombo[i]] != null) {
        randomWinningCombo = winningCombos[Math.floor(Math.random() * 8)];
        i = -1; //restart loop
        nullCount = 0;
        continue;
      } else {
        nullCount++;
      }

      if (nullCount == 3) {
        break;
      }
    }
  console.log(randomWinningCombo);
  document.getElementById(String(randomWinningCombo[winAttemptIndex])).click();
  winAttemptIndex++;
  console.log(`win attempt ind  ${winAttemptIndex}`);
  initializedWin = true;
  
  currentPlayer = X;
  return;
}

function checkIfInitializedWin() {
  for (const i of winningCombos) {
    if (i.includes(X)) {
      initializedWin = true;
      continue;
    } else if (!(i.includes(X)) && twoNull(i)) {
      initializedWin = false;
      continue;
    } else 
      initializedWin = true; 
  }
}

//function to count null spaces in combo
function twoNull(arr) {
  let numOfNull = 0;
  for (const j of arr) {
    if (j == null)
      numOfNull++;
  }
  if (numOfNull >= 2)
    return true;
  else return false;
}

function continueOWin() {
  console.log(`randwincomb2!!! ${randomWinningCombo}`);
  let canContinue = true;
  for (let i = 0; i < 3; i++) {
    if (gameBoardArr[randomWinningCombo[i]] == X)
      canContinue = false;
  }
  if (canContinue) {
    console.log(`here ${randomWinningCombo[winAttemptIndex]}`);
    document.getElementById(String(randomWinningCombo[winAttemptIndex])).click();
    winAttemptIndex++;
    currentPlayer = X;
    return;
  } else {
    winAttemptIndex = 0;
    return;
  }
}
