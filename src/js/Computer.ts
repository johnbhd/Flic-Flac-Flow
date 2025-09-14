

export class Computer {
    constructor() {}

    getMove(playerMoves: number[], computerMoves: number[], winnerCombo: number[][]) {
        const allMoves = [...playerMoves, ...computerMoves]
        const allCells = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const available = allCells.filter(cel => !allMoves.includes(cel)) // remaining moves

        console.log(available)

        if (available.length === 0) return null; // tie return nothing

        // computer strategy
        for (const combo of winnerCombo) {
            const move = this.findingWinningMove(combo, computerMoves, available);
            if (move) return move
        }

        // counter player moves
        for (const combo of winnerCombo) {
            const move = this.findingWinningMove(combo, playerMoves, available);
            if (move) return move;
        }

        // computer take center 
        if(available.includes(5)) return 5;

        // take corner 
        const corner = [1, 3, 7, 9].filter(c => available.includes(c));
        if (corner.length) return corner[Math.floor(Math.random() * corner.length)];

        // random moves
        if (Math.random() < 0.7) { // means only 70% of completely random moves by computer
            return available[Math.floor(Math.random() * available.length)]
        }
    }

    private findingWinningMove(combo: number[], moves: number[], available: number[]) {
        const hits = combo.filter(c => moves.includes(c)); // cell already occupied
        const remaining = combo.filter(c => !moves.includes(c)); // cell that player has'nt taken
        if (hits.length === 2 && remaining.length == 1 && available.includes(remaining[0])) {
            // if cell occupied 2 then target it
            // if cell occupied 1 then complete until win
            // if missing cell is not taken
            return remaining[0] // return the first value in remaining var
        }
        return null
    }
}
// things to do
// you can choose to be player 2 
// you can make computer vs computer and watch it. so to continue you theres option like auto moves if check then continue always if no check then manual continue

// img as player char 








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
