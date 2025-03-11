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
    
    // Chess piece Unicode characters with Diablo theme
    const pieces = {
        white: {
            king: '♔', // Angelic King
            queen: '♕', // Angelic Queen
            rook: '♖', // Angelic Tower
            bishop: '♗', // Angelic Priest
            knight: '♘', // Angelic Warrior
            pawn: '♙'  // Angelic Soldier
        },
        black: {
            king: '♚', // Demonic Lord
            queen: '♛', // Demonic Mistress
            rook: '♜', // Demonic Tower
            bishop: '♝', // Demonic Priest
            knight: '♞', // Demonic Steed
            pawn: '♟'  // Demonic Minion
        }
    };
    
    // Initialize the board
    function initializeBoard() {
        board = [
            // Black pieces (Demons)
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
            // White pieces (Angels)
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
    
    // Sound effects for Diablo theme
    function playMoveSound() {
        const moveSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-quick-jump-arcade-game-239.mp3');
        moveSound.volume = 0.3;
        moveSound.play();
    }
    
    function playCaptureSound() {
        const captureSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-falling-hit-757.mp3');
        captureSound.volume = 0.4;
        captureSound.play();
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
                        playCaptureSound();
                    } else {
                        blackCaptured.appendChild(capturedPieceElement);
                        playCaptureSound();
                    }
                } else {
                    playMoveSound();
                }
                
                // Update the board
                board[row][col] = pieceData;
                board[selectedRow][selectedCol] = null;
                
                // Switch player
                currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
                turnIndicator.textContent = currentPlayer === 'white' ? "Angels' turn" : "Demons' turn";
                
                // Clear selection and valid moves
                selectedPiece = null;
                validMoves = [];
                
                // Re-render the board
                renderBoard();
            } else if (square.dataset.color === currentPlayer) {
                // Select a different piece of the same color
                clearHighlights();
                selectedPi
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
                for (const [dr, dc] of [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]]) {
                    const r = row + dr;
                    const c = col + dc;
                    
                    if (isInBounds(r, c) && (!board[r][c] || board[r][c].color !== color)) {
                        moves.push({ row: r, col: c });
                    }
                }
                break;
                
            case 'bishop':
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
                for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
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
                
            case 'king':
                for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                    const r = row + dr;
                    const c = col + dc;
                    
                    if (isInBounds(r, c) && (!board[r][c] || board[r][c].color !== color)) {
                        moves.push({ row: r, col: c });
                    }
                }
                break;
        }
        
        return moves;
    }
    
    // Check if coordinates are within the board
    function isInBounds(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }
    
    // Highlight valid moves
    function highlightValidMoves() {
        for (const move of validMoves) {
            const square = document.querySelector(`.square[data-row="${move.row}"][data-col="${move.col}"]`);
            square.classList.add('valid-move');
        }
    }
    
    // Clear all highlights
    function clearHighlights() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('selected', 'valid-move');
        });
    }
    
    // Reset the game
    function resetGame() {
        selectedPiece = null;
        currentPlayer = 'white';
        validMoves = [];
        whiteCaptured.innerHTML = '';
        blackCaptured.innerHTML = '';
        turnIndicator.textContent = "Angels' turn";
        
        initializeBoard();
        renderBoard();
    }
    
    // Event listener for reset button
    resetButton.addEventListener('click', resetGame);
    
    // Initialize the game
    resetGame();
});
