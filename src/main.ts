import { Computer } from "./js/Computer.js";
import { UI } from "./js/UI.js";
import { Board } from "./js/Board.js";
import  { Game } from "./js/Game.js";
import { Storage } from "./js/Storage.js";

class FlicFlacFlow {
  ui: UI;
  board: Board;
  game: Game;
  computer: Computer;

  playerVal: string[];
  player: string[];
  playerLabel: string[];
  currentPlayer: string;
  gameover: boolean;
  gameScore: any;
  gameTitle: string

  constructor() {
    this.ui = new UI();
    this.game = new Game();
    this.computer = new Computer()
    this.playerVal = ["X", "O"];
    this.player = ["X", "O"];
    this.playerLabel = ["Player", "Computer"]
    this.currentPlayer = this.player[0];
    this.gameover = false;
    this.gameScore = { player1: 0, player2: 0, tie: 0 };
    this.gameTitle = "Flic Flac Flow"
    this.ui.showMessage(this.gameTitle);
    
    // create board
    this.board = new Board(this.ui.DOM, this.game.sizeBoard);
    this.ui.createStar();
    this.setupCellListener();

    // switch players 
    this.ui.setUpLabelPlayers()

    // setup chars
    this.ui.setUpCharInputs((chars) => {
      this.playerVal = chars;
      this.player = [...chars];
      this.currentPlayer = chars[0];
    })
  }

  // game restart
  gameRestart() {
      this.game.resetMoves()

      const cells = document.querySelectorAll('td');
      cells.forEach(cell => {
          cell.textContent = "";
          cell.classList.remove('highlight');
          cell.classList.remove('dimmed');
      });
      
      this.ui.DOM.reset.style.display = "block"
      this.currentPlayer = this.player[0];
      this.ui.showMessage(this.gameTitle);
      this.gameover = false;

      // enable input
      [this.ui.DOM.playerChar1, this.ui.DOM.playerChar2].forEach(ch => {
        ch.readOnly = false;
        ch.style.opacity = "1";
      });


     if (Storage.get("Player2") === "Computer" && this.currentPlayer === this.player[1]) {
        setTimeout(() => this.ComputerMove());
     }

  }

  setupCellListener() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => { 
      cell.addEventListener("click", this.ClickHandle.bind(this))
    })
  }
  
  // game start click
  ClickHandle(e: Event) {
    const target = e.target as HTMLTableCellElement;// render player character
    const index = Number(target.dataset.index); // cell index
    this.ui.DOM.reset.style.display = "none" 
    
    if (!target || target.textContent || this.gameover) return;

    // Set the cell to current player
    target.textContent = this.currentPlayer;

    // current player
    if (this.currentPlayer === this.player[0]) this.game.moveX.push(index);
    else this.game.moveY.push(index);
    
    const moves = this.currentPlayer === this.player[0] ? this.game.moveX : this.game.moveY;
    const winner = this.game.checkWinner(moves);

    if (winner) {
      this.board.highlightWinner(winner);
      this.ui.showMessage(`The winner is ${this.currentPlayer} Player!`);
      this.gameover = true;
      setTimeout(() => this.gameRestart(), 1500);
      return;
    }

    // switch player
    this.currentPlayer = this.currentPlayer === this.player[0] ? this.player[1] : this.player[0];
    this.ui.showMessage(`${this.currentPlayer}'s Turn!`);
    
    // swithc to computer, call computer class
    const player2 = Storage.get("Player2") || "Computer";
    if (this.currentPlayer === this.player[1] && player2 === "Computer"){
      setTimeout(() => this.ComputerMove());
    }
  }

  ComputerMove() {
    const compMove = this.computer.getMove(this.game.moveX, this.game.moveY)
    if (!compMove) return;

    const cell = document.querySelector(`[data-index='${compMove}']`);
    if (!cell || cell.textContent) return;

    // computer move
    cell.textContent = this.player[1]
    this.game.moveY.push(compMove);

    // Check if computer won
    const winner = this.game.checkWinner(this.game.moveY);
    if (winner) {
        this.board.highlightWinner(winner);
        this.ui.showMessage(`The winner is Computer!`);
        if (this.currentPlayer === this.player[0]) this.gameScore.player1++
        else this.gameScore.player2++
        Storage.set("Game", this.gameScore);
        this.ui.updateScore(this.gameScore.player1, this.gameScore.player2, this.gameScore.tie)
        this.gameover = true;
        setTimeout(() => this.gameRestart(), 1500);
        return;
    }
      
    // Check for tie after computer move
    if (this.game.checkTie()) {
        this.ui.showMessage(`Game Tie!`);
        this.gameScore.tie++;
        Storage.set("GameScore", this.gameScore);
        this.ui.updateScore(this.gameScore.player1, this.gameScore.player2, this.gameScore.tie)
        this.gameover = true;
        setTimeout(() => this.gameRestart(), 1500);
        return;
    }
    // switch to player
    this.currentPlayer = this.player[0];
    this.ui.showMessage(`Player's Turn!`);
  }
}

new FlicFlacFlow();
