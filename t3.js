const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const index = event.target.dataset.index;

    if (gameState[index] !== null || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameState.every(cell => cell !== null)) {
        gameActive = false;
        message.textContent = 'It\'s a draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return gameState[index] === currentPlayer;
        });
    });
}

function resetGame() {
    currentPlayer = 'X';
    gameState = Array(9).fill(null);
    gameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });
}
