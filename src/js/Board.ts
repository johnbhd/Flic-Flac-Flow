export class Board {
    DOM: any;
    count = 1

    constructor(DOM: any, sizeBoard: number) {
        this.DOM = DOM;
        this.count = 1;
        this.createBoard(sizeBoard)
    }

    createBoard(sizeBoard: number) {
        const board = document.createElement("table");
        board.classList.add("board");
        
        for(let i = 0; i < sizeBoard; i++) {
        const row = document.createElement("tr");   
            for (let j = 0; j < sizeBoard; j++) {
                const cell = document.createElement("td");
                cell.classList.add("cell");
                cell.dataset.row = i.toString();
                cell.dataset.col = j.toString();   
                cell.dataset.index = this.count.toString();
                this.count++

                //cell.addEventListener("click", this.ClickHandle.bind(this));
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        this.DOM.boardCon.appendChild(board)
        // this.DOM.message.textContent = "Flic Flac Flow";
        // this.DOM.boardCon.appendChild(board);
    }
    highlightWinner(winner: number[]) {
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
    clearBoard() {
        const cells = document.querySelectorAll("td");
        cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("highlight", "dimmed");
        });
        this.count = 1; 
  }
}