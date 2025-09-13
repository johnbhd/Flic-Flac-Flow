import { Computer } from "./js/Computer.js";

class FlicFlacFlow {
  constructor() {
    // this. is a encapsulation
    // constructor called method
    // dom declaration
    this.DOM = {
      boardCon: document.getElementById("tictactoe"),
      message: document.getElementById('message'),
      stars: document.querySelector('.stars'),
      player1Score: document.getElementById('player1-score'),
      player2Score: document.getElementById('player2-score'),  
      tieScore: document.getElementById('tie'),
      playerChar1: document.getElementById("player1-char"),
      playerChar2: document.getElementById("player2-char"),
      player1Label: document.getElementById("player1-label"),
      player2Label: document.getElementById("player2-label"),
      reset: document.querySelector(".reset"),
    }

    this.winnerCombo = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [7, 5, 3]
    ];

    this.sizeBoard = 3;
    this.count = 1;
    this.playerVal = ["X", "O"];
    this.player = ["X", "O"];
    this.playerLabel = ["Player", "Computer"]
    this.currentPlayer = this.player[0];
    this.gameover = false;
    this.moveX = [];
    this.moveY = [];
    this.gameScore = { player1: 0, player2: 0, tie: 0 };
    this.computer = new Computer()
    this.gameStarted = false
    this.justStart = true

    this.init() // calling function 
  }
  init() {
    this.loadFromLocalStorage()
    this.setupEventListener()
    this.updatePlayer()
    this.createStar()
    this.createBoard()
    this.gameReset()
    if (this.getDataLocalStorage("Player2") === "Computer") {
      this.ComputerMoves()
    }
  }
  // Computer
  ComputerMoves() {

  }

  // LOCAL STORAGE
  setDataLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getDataLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  // clear localstorage
  resetDataLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      this.setDataLocalStorage(key, "")
    }
    location.reload()
  }

  loadFromLocalStorage() {
    // player label localstorage
    const savePlayer1Label = this.getDataLocalStorage("Player1");
    const savePlayer2Label = this.getDataLocalStorage("Player2");
    this.setDataLocalStorage('Player1', 'Player');
    this.setDataLocalStorage('Player2', 'Computer');
    
    // change label base on local storage
    if (savePlayer1Label) {
      this.DOM.player1Label.textContent = savePlayer1Label;
    }

    if (savePlayer2Label) {
      this.DOM.player2Label.textContent = savePlayer2Label;
    }

    // player char
    const savedChar = this.getDataLocalStorage("PlayerChar");
    if (savedChar && Array.isArray(savedChar)) {
      this.DOM.playerChar1.value = savedChar[0];
      this.DOM.playerChar2.value = savedChar[1];
    }

    // game score local storage
    let savedGameScore = this.getDataLocalStorage("GameScore");
    if (!savedGameScore) {
        savedGameScore = { player1: 0, player2: 0, tie: 0 };
        this.setDataLocalStorage("GameScore", savedGameScore);
    }
    this.gameScore = savedGameScore;

    this.DOM.player1Score.textContent = savedGameScore.player1;
    this.DOM.player2Score.textContent = savedGameScore.player2;
    this.DOM.tieScore.textContent = savedGameScore.tie;
  }

  setupEventListener() {
    [this.DOM.player1Label, this.DOM.player2Label].forEach((el, index) => {
      el.addEventListener("click", () => {
          const newLabel = el.textContent = el.textContent === this.playerLabel[0] 
            ? this.playerLabel[1]  
            : this.playerLabel[0];
          el.textContent = newLabel;
          this.setDataLocalStorage(`Player${index + 1 }`, newLabel);
      })
    })
  }

  // changing player char base on input
  updatePlayer() {
    this.playerVal = [
      this.DOM.playerChar1.value  || "X",
      this.DOM.playerChar2.value || "O",
    ]
    this.player = [this.playerVal[0], this.playerVal[1]];
    this.currentPlayer = this.playerVal[0];

    [this.DOM.playerChar1, this.DOM.playerChar2].forEach(el => {
      el.addEventListener("input", this.updatePlayer.bind(this));
    })

  }

  // stars  


  // board of the game
  createBoard() {
    const board = document.createElement("table");
    board.classList.add("board");
    
    for(let i = 0; i < this.sizeBoard; i++) {
      const row = document.createElement("tr");   
      for (let j = 0; j < this.sizeBoard; j++) {
        const cell = document.createElement("td");
        cell.classList.add("cell");
        cell.dataset.row = i;
        cell.dataset.col = j;   
        cell.dataset.index = this.count;

        cell.addEventListener("click", this.ClickHandle.bind(this));
        row.appendChild(cell);
        this.count++;
      }
      board.appendChild(row);
    }
    this.DOM.message.textContent = "Flic Flac Flow";
    this.DOM.boardCon.appendChild(board);
  }
  CheckWinner(playerMoves) {
    for (let i = 0; i < this.winnerCombo.length; i++) {
    const [a, b, c] = this.winnerCombo[i];

    if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c))
      return [a, b, c]; 
    }
  }

  CheckTie() {
    if (this.moveX.length + this.moveY.length === 9) {
      this.gameScore.tie++;
      this.DOM.tieScore.textContent = this.gameScore.tie;
      this.setDataLocalStorage("GameScore", this.gameScore)
      return true;
    }
    return false;
  }

  // game restart
  gameRestart() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove('highlight');
      cell.classList.remove('dimmed');
    });
    
    this.DOM.reset.style.display = "block"
    this.moveX = [];
    this.moveY = [];
    this.currentPlayer = this.player[0];
    this.gameover = false;
    this.gameStarted = false;
    this.DOM.message.textContent = "Flic Flac Flow";
    [this.DOM.playerChar1, this.DOM.playerChar2].forEach(ch => {
      ch.readOnly = false
      ch.style.opacity = "1"
    })

  }

  // winner
  highlightWinner(winner) {
    const cells = document.querySelectorAll('td');
    
    cells.forEach(cell => {
      const indexs = Number(cell.dataset.index);
      
      if (winner.includes(indexs)) {
        cell.classList.add('highlight');
      } else {
        cell.classList.add('dimmed')
      }
    });
  }
  // scoring
  gameScoring() {
    if (this.currentPlayer === this.player[0]) {
      this.gameScore.player1++
      this.DOM.player1Score.textContent = this.gameScore.player1;
    } else {
      this.gameScore.player2++
      this.DOM.player2Score.textContent = this.gameScore.player2;
    }

    this.setDataLocalStorage("GameScore", this.gameScore)
  }
  
  // reset Game
  gameReset() {
    this.DOM.reset.addEventListener('click', () => {
      this.resetDataLocalStorage()
    })
  }

  // game start click
  ClickHandle(e) {
    this.setDataLocalStorage("PlayerChar", this.playerVal) // render player character
    const index = Number(e.target.dataset.index);
    
    [this.DOM.playerChar1, this.DOM.playerChar2].forEach(ch => {
      ch.readOnly = true
      ch.style.opacity = "0.6"
    })
    
    // game started label
    if (!this.gameover) {
      this.gameStarted = true;
      
      [this.DOM.player1Label, this.DOM.player2Label].forEach(el => {
        el.style.pointerEvents = "none"
        el.style.opacity = "0.6"
      })
    } else {
      [this.DOM.player1Label, this.DOM.player2Label].forEach(el => {
        el.style.pointerEvents = "auto"
        el.style.opacity = "1"
      })
    }
    
    this.DOM.reset.style.display = "none"
    // if game end and click again it will restart
    if (this.gameover) {
      this.gameRestart();
      return;
    }

    // Human Player
    if (e.target.textContent !== "") return;
    e.target.textContent = this.currentPlayer; 

    const isAgainstComputer = this.getDataLocalStorage("Player2") === "Computer"
    const moves = this.currentPlayer === this.player[0] ? this.moveX : this.moveY;
    moves.push(Number(e.target.dataset.index))

    const winningTiles = this.CheckWinner(moves);
    
    if (winningTiles) {
      this.highlightWinner(winningTiles);
      this.DOM.message.textContent = `The winner is ${this.currentPlayer} Player!`;
      this.gameover = true;
      this.gameScoring()
      return;
    }
    if (this.CheckTie()) {
      this.DOM.message.textContent = `Game Tie!`;
      this.gameover = true;
      return;
    }
    
    // switch mode Computer
    this.currentPlayer = this.currentPlayer === this.player[0] ? this.player[1] : this.player[0];
    this.DOM.message.textContent = `${this.currentPlayer}'s Turn!`;
    
    
    if (isAgainstComputer  && this.currentPlayer === this.player[1] && !this.gameover) {
      setTimeout(() => {
        const compMove = this.computer.getMove(this.moveX, this.moveY)
        if (compMove) {
          const compCell = document.querySelector(`[data-index='${compMove}']`);
          if(compCell && compCell.textContent === "") {
            compCell.textContent = this.player[1]
            this.moveY.push(compMove)
          }
          // Check if computer won
          const compWinningTiles = this.CheckWinner(this.moveY);
          if (compWinningTiles) {
              this.highlightWinner(compWinningTiles);
              this.DOM.message.textContent = `The winner is Computer!`;
              this.gameover = true;
              this.gameScoring();
              return;
          }
          
          // Check for tie after computer move
          if (this.CheckTie()) {
              this.DOM.message.textContent = `Game Tie!`;
              this.gameover = true;
              return;
          }
        }

        // Switch back to human player
        this.currentPlayer = this.player[0];
        this.DOM.message.textContent = `Player's Turn!`;

      })
    }
  }
}

new FlicFlacFlow();
// task - make old code as OOP practice clean code architecture
// score localstorage
// localstorage player icon
// local storage player or computer
// computer moves
// Done
// change character 
// GOAL 8-9-25
// use oop approach 
// make name clickable for the player or computer



// 8-17-25 
// AI MOVES AUTO


// 8-29-25
// done reset game local storage

// TODO
// next is the clean code split classes different files
// Image as a character use 
// fully responsive 