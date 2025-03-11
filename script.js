// Let's modify just the pieces part of the script to give them a Diablo theme
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    
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
    
    // ... rest of the existing code ...
    
    // Add sound effects for Diablo theme
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
    
    // Modify the handleSquareClick function to include sounds
    function handleSquareClick(event) {
        // ... existing code ...
        
        if (isValidMove) {
            // ... existing code for moving pieces ...
            
            // Add sound effect
            if (board[row][col]) {
                playCaptureSound(); // Play capture sound
            } else {
                playMoveSound(); // Play move sound
            }
            
            // ... rest of the existing move code ...
        }
        
        // ... rest of the existing function ...
    }
    
    // ... rest of the existing code ...
});
