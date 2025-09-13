export class Game {
    
    sizeBoard = 3;
    winnerCombo = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [7, 5, 3]
    ];

    moveX: number[] = [];
    moveY: number[] = [];
    
    checkWinner(playerMoves: number[]): number[] | undefined {
        for (let i = 0; i < this.winnerCombo.length; i++) {
        const [a, b, c] = this.winnerCombo[i];

        if (playerMoves.includes(a) && playerMoves.includes(b) && playerMoves.includes(c))
            return [a, b, c]; 
        }
    }

    checkTie():boolean {
        return this.moveX.length + this.moveY.length === 9;
    }

    resetMoves() {
        this.moveX = []
        this.moveY = []
    }
}