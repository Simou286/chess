# Chess Game Project

I'll create a simple chess game using HTML, CSS, and JavaScript. This will be a basic implementation that allows two players to play chess on the same computer.

Let's start by creating the necessary files:

## HTML File

```html:c:\Users\simon\Desktop\Trae\index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chess Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Chess Game</h1>
        <div class="game-info">
            <div id="turn-indicator">White's turn</div>
            <button id="reset-button">New Game</button>
        </div>
        <div id="chessboard"></div>
        <div id="captured-pieces">
            <div id="white-captured" class="captured-area">
                <h3>Captured by White</h3>
                <div class="pieces"></div>
            </div>
            <div id="black-captured" class="captured-area">
                <h3>Captured by Black</h3>
                <div class="pieces"></div>
            </div>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

## CSS File

```css:c:\Users\simon\Desktop\Trae\style.css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    justify-content: center;
    padding: 20px;
}

.container {
    max-width: 800px;
    width: 100%;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

.game-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

#turn-indicator {
    font-size: 1.2rem;
    font-weight: bold;
}

#reset-button {
    padding: 8px 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

#reset-button:hover {
    background-color: #45a049;
}

#chessboard {
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(8, 1fr);
    border: 2px solid #333;
}

.square {
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.5rem;
    cursor: pointer;
    position: relative;
}

.white {
    background-color: #f0d9b5;
}

.black {
    background-color: #b58863;
}

.selected {
    background-color: #aec6cf !important;
}

.valid-move {
    position: relative;
}

.valid-move::after {
    content: "";
    position: absolute;
    width: 25%;
    height: 25%;
    background-color: rgba(0, 128, 0, 0.5);
    border-radius: 50%;
    z-index: 1;
}

.check {
    background-color: #ff6b6b !important;
}

#captured-pieces {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.captured-area {
    width: 48%;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.captured-area h3 {
    margin-bottom: 10px;
    text-align: center;
}

.pieces {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    font-size: 1.5rem;
}

@media (max-width: 600px) {
    #chessboard {
        max-width: 100%;
    }
    
    .square {
        font-size: 1.8rem;
    }
    
    #captured-pieces {
        flex-direction: column;
        gap: 10px;
    }
    
    .captured-area {
        width: 100%;
    }
}
```

## JavaScript File

```javascript:c:\Users\simon\Desktop\Trae\script.js
document.addEventListener('DOMContentLoaded', () => {
    const chessboard = document.getElementById('chessboard');
    const turnIndicator = document.getElementById('turn-indicator');
    const resetButton = document.getElementById('reset-button');
    const whiteCaptured = document.querySelector('#white-captured .pieces');
    const blackCaptured = document.querySelector('#black-captured .pieces');
    
    let selectedPiece = null;
    let currentPlayer = 'white';
    let validMoves = [];
    let board = [];
    
    // Chess piece Unicode characters
    const pieces = {
        white: {
            king: '♔',
            queen: '♕',
            rook: '♖',
            bishop: '♗',
            knight: '♘',
            pawn: '♙'
        },
        black: {
            king: '♚',
            queen: '♛',
            rook: '♜',
            bishop: '♝',
            knight: '♞',
            pawn: '♟'
        }
    };
    
    // Initialize the board
    function initializeBoard() {
        board = [
            // Black pieces
            [
                { piece: 'rook', color: 'black' },
                { piece: 'knight', color: 'black' },
                { piece: 'bishop', color: 'black' },
                { piece: 'queen', color: 'black' },
                { piece: 'king', color: 'black' },
                { piece: 'bishop', color: 'black' },
                { piece: 'knight', color: 'black' },
                { piece: 'rook', color: 'black' }
            ],
            [
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' },
                { piece: 'pawn', color: 'black' }
            ],
            // Empty squares
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            // White pieces
            [
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' },
                { piece: 'pawn', color: 'white' }
            ],
            [
                { piece: 'rook', color: 'white' },
                { piece: 'knight', color: 'white' },
                { piece: 'bishop', color: 'white' },
                { piece: 'queen', color: 'white' },
                { piece: 'king', color: 'white' },
                { piece: 'bishop', color: 'white' },
                { piece: 'knight', color: 'white' },
                { piece: 'rook', color: 'white' }
            ]
        ];
    }
    
    // Render the chessboard
    function renderBoard() {
        chessboard.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');
                square.dataset.row = row;
                square.dataset.col = col;
                
                const pieceData = board[row][col];
                if (pieceData) {
                    square.textContent = pieces[pieceData.color][pieceData.piece];
                    square.dataset.piece = pieceData.piece;
                    square.dataset.color = pieceData.color;
                }
                
                square.addEventListener('click', handleSquareClick);
                chessboard.appendChild(square);
            }
        }
    }
    
    // Handle square click
    function handleSquareClick(event) {
        const square = event.target;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        
        // If a piece is already selected
        if (selectedPiece) {
            const selectedRow = parseInt(selectedPiece.dataset.row);
            const selectedCol = parseInt(selectedPiece.dataset.col);
            
            // Check if the clicked square is a valid move
            const isValidMove = validMoves.some(move => move.row === row && move.col === col);
            
            if (isValidMove) {
                // Move the piece
                const pieceData = board[selectedRow][selectedCol];
                
                // Check if there's a capture
                if (board[row][col]) {
                    const capturedPiece = board[row][col];
                    const capturedPieceElement = document.createElement('span');
                    capturedPieceElement.textContent = pieces[capturedPiece.color][capturedPiece.piece];
                    
                    if (currentPlayer === 'white') {
                        whiteCaptured.appendChild(capturedPieceElement);
                    } else {
                        blackCaptured.appendChild(capturedPieceElement);
                    }
                }
                
                // Update the board
                board[row][col] = pieceData;
                board[selectedRow][selectedCol] = null;
                
                // Switch player
                currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                turnIndicator.textContent = `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
                
                // Clear selection and valid moves
                selectedPiece = null;
                validMoves = [];
                
                // Re-render the board
                renderBoard();
            } else if (square.dataset.color === currentPlayer) {
                // Select a different piece of the same color
                clearHighlights();
                selectedPiece = square;
                square.classList.add('selected');
                
                // Calculate valid moves for the new selected piece
                validMoves = calculateValidMoves(row, col);
                highlightValidMoves();
            } else {
                // Clear selection if clicking on an invalid square
                clearHighlights();
                selectedPiece = null;
                validMoves = [];
            }
        } else if (square.dataset.color === currentPlayer) {
            // Select a piece
            selectedPiece = square;
            square.classList.add('selected');
            
            // Calculate valid moves
            validMoves = calculateValidMoves(row, col);
            highlightValidMoves();
        }
    }
    
    // Calculate valid moves for a piece
    function calculateValidMoves(row, col) {
        const pieceData = board[row][col];
        if (!pieceData) return [];
        
        const moves = [];
        const { piece, color } = pieceData;
        
        switch (piece) {
            case 'pawn':
                // Pawns move differently based on color
                const direction = color === 'white' ? -1 : 1;
                const startRow = color === 'white' ? 6 : 1;
                
                // Move forward one square
                if (isInBounds(row + direction, col) && !board[row + direction][col]) {
                    moves.push({ row: row + direction, col });
                    
                    // Move forward two squares from starting position
                    if (row === startRow && !board[row + 2 * direction][col]) {
                        moves.push({ row: row + 2 * direction, col });
                    }
                }
                
                // Capture diagonally
                for (const offset of [-1, 1]) {
                    if (isInBounds(row + direction, col + offset) && 
                        board[row + direction][col + offset] && 
                        board[row + direction][col + offset].color !== color) {
                        moves.push({ row: row + direction, col: col + offset });
                    }
                }
                break;
                
            case 'rook':
                // Horizontal and vertical movement
                for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                    let r = row + dr;
                    let c = col + dc;
                    
                    while (isInBounds(r, c)) {
                        if (!board[r][c]) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (board[r][c].color !== color) {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                break;
                
            case 'knight':
                // L-shaped movement
                for (const [dr, dc] of [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]) {
                    const r = row + dr;
                    const c = col + dc;
                    
                    if (isInBounds(r, c) && (!board[r][c] || board[r][c].color !== color)) {
                        moves.push({ row: r, col: c });
                    }
                }
                break;
                
            case 'bishop':
                // Diagonal movement
                for (const [dr, dc] of [[1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                    let r = row + dr;
                    let c = col + dc;
                    
                    while (isInBounds(r, c)) {
                        if (!board[r][c]) {
                            moves.push({ row: r, col: c });
                        } else {
                            if (board[r][c].color !== color) {
                                moves.push({ row: r, col: c });
                            }
                            break;
                        }
                        r += dr;
                        c += dc;
                    }
                }
                break;
                
            case 'queen':
                // Combination of rook and bishop movement
                for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                    