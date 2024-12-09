// Build Game Board
// Using IIFE (Immediately Invoked Function Expression)
// Wraps a gameboard factory function inside of IIFE
const gameBoard = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    const setPositionX = (x,y) => board[x][y] = 'x';
    const setPositionO = (x,y) => board[x][y] = 'o';

    const getCurrGame = () => board;

    const checkWin = (player) =>{
        // check all in one row win
        for(let row of board){
            if(row[0] == player && row[1] == player && row[2] == player){
                console.log('here');
                return true;
            }
        }

        // check all in one column win
        for(let i = 0; i < 3; i++){
            let column = [board[0][i], board[1][i], board[2][i]];
            if(column[0] == player && column[1] == player && column[2] == player){
                return true;
            }
        }

        // check diagonal win
        let diagonal1 = [board[0][0], board[1][1], board[2][2]];
        let diagonal2 = [board[0][2], board[1][1], board[2][0]];
        diagonal1 = diagonal1.filter((elem) => elem == player);
        diagonal2 = diagonal2.filter((elem) => elem == player);
        if(diagonal1.length == 3 || diagonal2.length == 3){
            console.log('here');
            return true;
        }
        return false;
    }

    return {setPositionO, setPositionX, checkWin, getCurrGame};
})();

const Player = function (mark) {
    
    getMark = () => mark;

    setPosition = function (mark) {
        if(mark == 'o') gameBoard.setPositionO(x,y);
        else gameBoard.setPositionX(x,y);
    }
    
    return {getMark, setPosition};
}

const player1 = Player('x');
const player2 = Player('o');
let activePlayer = player1;

document.querySelectorAll('.square').forEach((square) =>
    square.addEventListener('click',function() {
    this.className = this.className + ` ${activePlayer.getMark()}`;
    activePlayer = activePlayer == player1 ? player2 : player1;
    }
));