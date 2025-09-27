import { Storage } from "./Storage";

export class UI {
    DOM: any;
    playerLabel: string[];

    constructor() {
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
            tieLabel: document.getElementById("tie-label"),
            reset: document.querySelector(".reset"),

        }
        this.playerLabel = ["Player", "Computer"];
    }

    createStar(count:number = 20) {
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            this.DOM.stars.appendChild(star);
        }
    }

    showMessage(msg: string) {
        this.DOM.message.textContent = msg;
    }

    updateScore(player1: number, player2: number, tie: number) {
        this.DOM.player1Score.textContent = player1;
        this.DOM.player2Score.textContent = player2;
        this.DOM.tieScore.textContent = tie
    }

    setUpLabelPlayers() {
    [this.DOM.player1Label, this.DOM.player2Label].forEach((el, index) => {
        el.addEventListener("click", () => {
            if (!el.textContent) return;

            const newLabel = el.textContent === this.playerLabel[0] 
                ? this.playerLabel[1]  
                : this.playerLabel[0];
            el.textContent = newLabel;

            Storage.set(`Player${index + 1 }`, newLabel);
        })
        })
    }

    setUpCharInputs(updateCallBacks: (chars: string[]) => void) {
        [this.DOM.playerChar1, this.DOM.playerChar2].forEach(el => {
            el.addEventListener("input", () => {
                const chars = [
                    this.DOM.playerChar1.value || 'X',
                    this.DOM.playerChar2.value || 'O',
                ]
                updateCallBacks(chars)
            });
        })
    }

    onGamePlay(gameStart: boolean) {
        if (gameStart) {
            [this.DOM.playerChar1, this.DOM.playerChar2].forEach(ch => {
                if (ch instanceof HTMLInputElement) {
                    ch.readOnly = true;
                    ch.style.opacity = "0.6";

                }
            });
            [this.DOM.player1Label, this.DOM.player2Label, this.DOM.tieLabel].forEach(label => {
                if (label) {
                    label.style.pointerEvents = "none";
                    (label as HTMLElement).style.opacity = "0.6"; 
                }
            });
        } else {
            [this.DOM.playerChar1, this.DOM.playerChar2].forEach(ch => {
                if (ch instanceof HTMLInputElement) {
                    ch.readOnly = false;
                    ch.style.opacity = "1";

                }
            });
            [this.DOM.player1Label, this.DOM.player2Label, this.DOM.tieLabel].forEach(label => {
                if (label) {
                    label.style.pointerEvents = "auto";
                    (label as HTMLElement).style.opacity = "1"; 
                }
            });
        }
    }

}