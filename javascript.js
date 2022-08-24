/* TicTacToe





*/

/*

PLAYER
*/
const player = (name, marker) => {
  return { name, marker };
};

/*

GAME
*/
const stateGame = (() => {
  let firstPlayer = player('First Player', 'X');
  let secondPlayer = player('Second Player', 'O');

  let firstPlayerTurn = true;
  // Random first player?
  //   let firstPlayerTurn = Math.floor(Math.random() * 2);

  let theEnd = false;

  const checkEndGame = () => {
    const winConditions = [
      'row1',
      'row2',
      'row3',
      'col1',
      'col2',
      'col3',
      'diag1',
      'diag2',
    ];

    winConditions.map((conditionButtons) => {
      const buttons = document.querySelectorAll(`.${conditionButtons}`);
      const condition = Array.from(buttons).map((i) => i.innerHTML);

      if (condition.every((i) => i === 'X')) {
        return (theEnd = 'X');
      } else if (condition.every((i) => i === 'O')) {
        return (theEnd = 'O');
      } else {
        const allButtons = Array.from(document.querySelectorAll('button'));
        allButtons.pop();
        allButtons.shift();
        if (allButtons.every((i) => i.disabled === true)) {
          return (theEnd = 'tie');
        }
      }
    });
    return theEnd;
  };

  const changeNames = () => {
    const inputFirstPlayer = document.getElementById('first-player');
    const inputSecondPlayer = document.getElementById('second-player');

    if (inputFirstPlayer.value !== '') {
      firstPlayer.name = inputFirstPlayer.value;
    }

    if (inputSecondPlayer.value !== '') {
      secondPlayer.name = inputSecondPlayer.value;
    }
    inputFirstPlayer.value = '';
    inputSecondPlayer.value = '';
  };

  const playTurn = (e, args) => {
    const gameOverText = document.querySelector('.game-over-text');
    let marker = firstPlayerTurn ? 'X' : 'O';

    gameBoard.changeBoard(e.className.split(' ')[0], marker);
    displayController.render();

    let gameOver = checkEndGame();

    if (gameOver === 'tie') {
      gameOverText.textContent = "Game Over. It's a Tie!";
    } else if (gameOver === 'X') {
      gameOverText.textContent = `Game Over. ${firstPlayer.name} Won!`;
      displayController.disableButtons();
    } else if (gameOver === 'O') {
      gameOverText.textContent = `Game Over. ${secondPlayer.name} Won!`;
      displayController.disableButtons();
    } else {
      firstPlayerTurn = !firstPlayerTurn;
      const subTitle = document.querySelector('h2');
      subTitle.textContent = `${
        firstPlayerTurn ? firstPlayer.name : secondPlayer.name
      } Turn (${
        firstPlayerTurn ? firstPlayer.marker : secondPlayer.marker
      })`;
    }
  };

  const resetGame = () => {
    const gameOverText = document.querySelector('.game-over-text');
    gameOverText.textContent = '';
    theEnd = false;
    gameBoard.resetBoard();
    displayController.enableButtons();
    displayController.render();
  };

  return { firstPlayerTurn, playTurn, resetGame, changeNames };
})();

/*

GAMEBOARD
*/
const gameBoard = (() => {
  let gameboardArray = Array(9);

  const changeBoard = (i, marker) => {
    gameboardArray[i] = marker;
  };

  const resetBoard = () => {
    gameboardArray = Array(9);
  };

  const getBoard = () => {
    return gameboardArray;
  };

  return { changeBoard, resetBoard, getBoard };
})();

/*

DISPLAY
*/
const displayController = (() => {
  const buttons = Array.from(document.querySelectorAll('button'));
  const resetButton = buttons.pop();
  const changeNamesButton = buttons.shift();

  resetButton.addEventListener('click', stateGame.resetGame);

  changeNamesButton.addEventListener('click', stateGame.changeNames);

  buttons.forEach((b) => {
    b.addEventListener('click', stateGame.playTurn.bind(this, b));
  });

  const render = (title, endGame) => {
    let board = gameBoard.getBoard();
    let i = 0;
    buttons.forEach((btn) => {
      btn.textContent = board[i];
      i++;
    });
  };

  const disableButtons = (b) => {
    buttons.forEach((b) => {
      b.disabled = true;
    });
  };

  const enableButtons = (b) => {
    buttons.forEach((b) => {
      b.disabled = false;
    });
  };

  return { render, disableButtons, enableButtons };
})();
