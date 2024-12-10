// Build Game Board
// Using IIFE (Immediately Invoked Function Expression)
// Wraps a gameboard factory function inside of IIFE
const gameBoard = (function () {
    const board = [[0,0,0],[0,0,0],[0,0,0]];
    let start = false;
    const startGame =  document.querySelector('.startGame');
    const resetGame = document.querySelector('.resetGame');
    const players = document.querySelector('.players');
    startGame.addEventListener('click', function () {
        start = true;
        this.className = `${this.className} none`;
        resetGame.className = 'resetGame';
        document.querySelector('.player1Wins').className += ' none';
        document.querySelector('.player2Wins').className += ' none';
        document.querySelector('.draw').className += ' none';
    })

    resetGame.addEventListener('click', function () {
        this.className = `${this.className} none`;
        startGame.className = 'startGame';
        document.querySelector('.players').className = 'players';
        document.querySelector('.player1Wins').className = 'player1Wins none';
        document.querySelector('.player2Wins').className = 'player2Wins none';
        document.querySelector('.draw').className = 'draw none';
        gameBoard.resetBoard();
    })

    const getStatus = () => start;
    const setPositionX = (x,y) => board[x][y] = 'x';
    const setPositionO = (x,y) => board[x][y] = 'o';

    const getCurrGame = () => board;

    const checkWin = (player) =>{
        // check all in one row win
        for(let row of board){
            if(row[0] == player && row[1] == player && row[2] == player){
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
            return true;
        }
        return false;
    }

    const checkDraw = () =>{
        if(!checkWin('x') && !checkWin('o')){
            for(let row of board){
                for(let col of row){
                    if(col == 0) return false;
                }
            }
        }
        return true;
    }

    const resetBoard = () =>{
        board.forEach((row)=> row.fill(0));
        document.querySelectorAll('.square').forEach((square)=>{
            const name = square.className.split(' ');
            square.className = `${name[0]} ${name[1]}`;
        })
    }

    const announceWinner = (mark) =>{
        players.className += ' none';
        if(mark == 'x'){
            document.querySelector('.player1Wins').className = 'player1Wins';
        }else{
            document.querySelector('.player2Wins').className = 'player2Wins';
        }
        start = false;
    }

    const announceDraw = () => {
        document.querySelector('.players').className += ' none';
        document.querySelector('.draw').className = 'draw';
        start = false;
    }

    return {setPositionO, setPositionX, checkWin, getCurrGame, resetBoard, getStatus, checkDraw, announceWinner, announceDraw};
})();

const Player = function (mark) {
    getMark = () => mark;

    setPosition = function (x,y) {
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
    // Get Current Clicked Square Position
    const position = this.className.split(' ')[1].split('').map((pos) => Number(pos));
    // Check if current square is available
    if(gameBoard.getCurrGame()[position[0]][position[1]] != 0 || !gameBoard.getStatus()) return;
    
    // Mark Square
    this.className = this.className + ` ${activePlayer.getMark()}`;
    activePlayer.setPosition(position[0], position[1]);
    

    // check win or draw
    if(gameBoard.checkWin(activePlayer.getMark())) {
        gameBoard.announceWinner(activePlayer.getMark());
        return;
    }
    if(gameBoard.checkDraw()) gameBoard.announceDraw();
    activePlayer = activePlayer == player1 ? player2 : player1;
    }
));