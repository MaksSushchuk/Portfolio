const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const winBlock = document.querySelector('.game__win');
const winMessage = document.querySelector('.message');
const btnReset = document.querySelector('.game__reset');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const x = j * 100 + 10;
            const y = i * 100 + 10;

            const cellIndex = i * 3 + j;
            const cellValue = board[cellIndex];

            ctx.strokeRect(x, y, 80, 80);

            if (cellValue === 'X') {
                drawCross(x, y);
            } else if (cellValue === 'O') {
                drawCircle(x, y);
            }
        }
    }
}

function drawCross(x, y) {
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 10);
    ctx.lineTo(x + 70, y + 70);
    ctx.moveTo(x + 70, y + 10);
    ctx.lineTo(x + 10, y + 70);
    ctx.stroke();
}

function drawCircle(x, y) {
    ctx.beginPath();
    ctx.arc(x + 40, y + 40, 30, 0, Math.PI * 2);
    ctx.stroke();
}

function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    if (board.every(cell => cell !== '')) {
        return 'tie';
    }

    return null;
}

function showWinMessage(winner) {
    if (winner === 'tie') {
        winMessage.textContent = 'Нічия';
    } else {
        winMessage.textContent = `${winner} переміг!`;
    }
    winBlock.style.display = 'flex';
}

canvas.addEventListener('click', function (event) {
    if (gameEnded) return;
    
    const x = event.offsetX;
    const y = event.offsetY;
    const columnIndex = Math.floor(x / 100);
    const rowIndex = Math.floor(y / 100);
    const cellIndex = rowIndex * 3 + columnIndex;

    if (board[cellIndex] === '') {
        board[cellIndex] = currentPlayer;
        drawBoard();

        const winner = checkWin();
        if (winner) {
            gameEnded = true;
            showWinMessage(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
});

btnReset.addEventListener('click', function () {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameEnded = false;
    winBlock.style.display = 'none';
    drawBoard();
});

drawBoard();
