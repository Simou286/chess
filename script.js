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
