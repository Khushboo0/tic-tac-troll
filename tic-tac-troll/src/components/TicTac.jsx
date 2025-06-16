import React, { useState, useEffect } from 'react';

const TicTac = () => {
  // Grid size state (default 3x3)
  const [gridSize, setGridSize] = useState(3);
  // Initialize board based on grid size
  const [board, setBoard] = useState(Array(gridSize * gridSize).fill(null));
  // Track move history for console logging
  const [moveHistory, setMoveHistory] = useState([]);
  // Animation and popup states
  const [isAnimating, setIsAnimating] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  // Game statistics
  const [gamesReset, setGamesReset] = useState(0);

  // Reset board when grid size changes
  useEffect(() => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setMoveHistory([]);
    setGamesReset(0);
    console.log(`Grid size changed to ${gridSize}x${gridSize}`);
  }, [gridSize]);

  // Function to convert 1D array index to 2D coordinates
  const indexToCoords = (index, size) => {
    const row = Math.floor(index / size);
    const col = index % size;
    return { row: row + 1, col: col + 1 }; // 1-indexed for display
  };

  // Function to check if there's a winner (dynamic for any grid size)
  const calculateWinner = (squares, size) => {
    const winLength = size; // Need full row/column/diagonal to win
    
    // Check rows
    for (let row = 0; row < size; row++) {
      const startIndex = row * size;
      let winner = squares[startIndex];
      if (winner) {
        let isWinning = true;
        for (let i = 1; i < winLength; i++) {
          if (squares[startIndex + i] !== winner) {
            isWinning = false;
            break;
          }
        }
        if (isWinning) return winner;
      }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      let winner = squares[col];
      if (winner) {
        let isWinning = true;
        for (let i = 1; i < winLength; i++) {
          if (squares[col + i * size] !== winner) {
            isWinning = false;
            break;
          }
        }
        if (isWinning) return winner;
      }
    }

    // Check main diagonal (top-left to bottom-right)
    let winner = squares[0];
    if (winner) {
      let isWinning = true;
      for (let i = 1; i < winLength; i++) {
        if (squares[i * (size + 1)] !== winner) {
          isWinning = false;
          break;
        }
      }
      if (isWinning) return winner;
    }

    // Check anti-diagonal (top-right to bottom-left)
    winner = squares[size - 1];
    if (winner) {
      let isWinning = true;
      for (let i = 1; i < winLength; i++) {
        if (squares[(size - 1) + i * (size - 1)] !== winner) {
          isWinning = false;
          break;
        }
      }
      if (isWinning) return winner;
    }

    return null; // No winner yet
  };

  // Function to check if X is about to win (has 2 in a row with 1 empty)
  const isXAboutToWin = (squares, size) => {
    const winLength = size;
    
    // Check rows
    for (let row = 0; row < size; row++) {
      const startIndex = row * size;
      let xCount = 0, oCount = 0, emptyCount = 0;
      for (let i = 0; i < winLength; i++) {
        const cell = squares[startIndex + i];
        if (cell === 'X') xCount++;
        else if (cell === 'O') oCount++;
        else emptyCount++;
      }
      if (xCount === winLength - 1 && oCount === 0 && emptyCount === 1) return true;
    }

    // Check columns
    for (let col = 0; col < size; col++) {
      let xCount = 0, oCount = 0, emptyCount = 0;
      for (let i = 0; i < winLength; i++) {
        const cell = squares[col + i * size];
        if (cell === 'X') xCount++;
        else if (cell === 'O') oCount++;
        else emptyCount++;
      }
      if (xCount === winLength - 1 && oCount === 0 && emptyCount === 1) return true;
    }

    // Check main diagonal
    let xCount = 0, oCount = 0, emptyCount = 0;
    for (let i = 0; i < winLength; i++) {
      const cell = squares[i * (size + 1)];
      if (cell === 'X') xCount++;
      else if (cell === 'O') oCount++;
      else emptyCount++;
    }
    if (xCount === winLength - 1 && oCount === 0 && emptyCount === 1) return true;

    // Check anti-diagonal
    xCount = 0; oCount = 0; emptyCount = 0;
    for (let i = 0; i < winLength; i++) {
      const cell = squares[(size - 1) + i * (size - 1)];
      if (cell === 'X') xCount++;
      else if (cell === 'O') oCount++;
      else emptyCount++;
    }
    if (xCount === winLength - 1 && oCount === 0 && emptyCount === 1) return true;

    return false;
  };

  // AI move strategy for O
  const getAIMove = (currentBoard, size) => {
    const availableMoves = [];
    
    // Find all available moves
    for (let i = 0; i < currentBoard.length; i++) {
      if (!currentBoard[i]) {
        availableMoves.push(i);
      }
    }

    if (availableMoves.length === 0) return null;

    // Strategy 1: Block X from winning
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      // Check if this blocks X from winning
      const boardWithX = [...currentBoard];
      boardWithX[move] = 'X';
      if (calculateWinner(boardWithX, size) === 'X') {
        return move; // Block this winning move
      }
    }

    // Strategy 2: Try to win if possible
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = 'O';
      if (calculateWinner(testBoard, size) === 'O') {
        return move; // Win the game
      }
    }

    // Strategy 3: Take center if available
    const center = Math.floor(size / 2) * size + Math.floor(size / 2);
    if (availableMoves.includes(center)) {
      return center;
    }
    
    // Strategy 4: Take corners
    const corners = [0, size - 1, size * (size - 1), size * size - 1];
    for (let corner of corners) {
      if (availableMoves.includes(corner)) {
        return corner;
      }
    }
    
    // Strategy 5: Take any available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  // Trigger board reset animation
  const triggerBoardReset = () => {
    console.log('🚫 X was about to win! Resetting board...');
    setIsAnimating(true);
    setShowPopup(true);
    setGamesReset(prev => prev + 1);
    
    // Reset after animation
    setTimeout(() => {
      setBoard(Array(gridSize * gridSize).fill(null));
      setMoveHistory([]);
      setIsAnimating(false);
    }, 2000);

    // Hide popup after delay
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Handle when a square is clicked (Player X move)
  const handleClick = (i) => {
    if (isAnimating) return; // Prevent moves during animation
    
    const boardCopy = [...board];
    
    // Don't allow moves if square is already filled
    if (boardCopy[i]) {
      return;
    }

    const coords = indexToCoords(i, gridSize);
    
    // Place X (player move)
    boardCopy[i] = 'X';
    console.log(`Player X moved to position (${coords.row}, ${coords.col})`);
    
    // Update move history
    const newMove = {
      player: 'X',
      position: i,
      coords: coords,
      moveNumber: moveHistory.length + 1
    };
    setMoveHistory(prev => [...prev, newMove]);
    
    // Check if X wins immediately
    if (calculateWinner(boardCopy, gridSize) === 'X') {
      console.log('🎉 Congratulations! You won!');
      setBoard(boardCopy);
      return;
    }
    
    // Check if X is about to win (before AI move)
    if (isXAboutToWin(boardCopy, gridSize)) {
      setBoard(boardCopy); // Show X's move briefly
      setTimeout(() => {
        triggerBoardReset();
      }, 500);
      return;
    }
    
    // Update board with X's move
    setBoard(boardCopy);
    
    // Check for draw before AI move
    if (boardCopy.every(square => square !== null)) {
      console.log('🤝 Game Over! It\'s a draw!');
      return;
    }
    
    // AI makes move after a short delay
    setTimeout(() => {
      const aiMove = getAIMove(boardCopy, gridSize);
      if (aiMove !== null) {
        const newBoardCopy = [...boardCopy];
        newBoardCopy[aiMove] = 'O';
        const aiCoords = indexToCoords(aiMove, gridSize);
        
        console.log(`AI (O) moved to position (${aiCoords.row}, ${aiCoords.col})`);
        
        // Check if AI wins
        if (calculateWinner(newBoardCopy, gridSize) === 'O') {
          console.log('🤖 AI wins! Better luck next time!');
        }
        
        setBoard(newBoardCopy);
        setMoveHistory(prev => [...prev, {
          player: 'O',
          position: aiMove,
          coords: aiCoords,
          moveNumber: prev.length + 1
        }]);
      }
    }, 800);
  };

  // Reset the game to initial state
  const resetGame = () => {
    setBoard(Array(gridSize * gridSize).fill(null));
    setMoveHistory([]);
    setGamesReset(0);
    setIsAnimating(false);
    setShowPopup(false);
    console.log(`🔄 Game reset! New ${gridSize}x${gridSize} game started.`);
  };

  // Change grid size
  const changeGridSize = (newSize) => {
    setGridSize(newSize);
  };

  // Check current game status
  const winner = calculateWinner(board, gridSize);
  const isDraw = !winner && board.every(square => square !== null);
  
  // Determine status message
  let status;
  if (winner === 'X') {
    status = "🎉 You Won! Amazing!";
  } else if (winner === 'O') {
    status = "🤖 AI Wins! Try Again!";
  } else if (isDraw) {
    status = "🤝 It's a Draw!";
  } else {
    status = "Your turn (X)";
  }

  // Calculate square size based on grid size
  const squareSize = gridSize <= 3 ? 'w-20 h-20' : gridSize === 4 ? 'w-16 h-16' : 'w-12 h-12';
  const fontSize = gridSize <= 3 ? 'text-4xl' : gridSize === 4 ? 'text-3xl' : 'text-2xl';

  // Component to render individual squares
  const Square = ({ value, onClick, index }) => {
    const coords = indexToCoords(index, gridSize);
    return (
      <button
        className={`${squareSize} bg-white border-2 border-gray-400 ${fontSize} font-bold 
                   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition-all duration-200 flex items-center justify-center
                   ${isAnimating ? 'animate-pulse bg-red-200 border-red-400' : ''}
                   ${value === 'X' ? 'text-blue-600' : value === 'O' ? 'text-red-600' : ''}`}
        onClick={onClick}
        title={`Position (${coords.row}, ${coords.col})`}
        disabled={isAnimating}
      >
        {value}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 relative">
      {/* Popup overlay */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-2xl animate-bounce">
            <div className="text-6xl mb-4">😈</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Not That Easy!</h2>
            <p className="text-gray-700">I won't let you win that easily!</p>
            <div className="mt-4 text-sm text-gray-500">
              Board reset #{gamesReset}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Tic Tac Troll
        </h1>
        <p className="text-center text-gray-600 mb-6">
          You are X, AI is O. Try to win if you can! 😏
        </p>
        
        {/* Grid size selector */}
        <div className="flex justify-center mb-6 space-x-2">
          <span className="text-lg font-medium text-gray-700 mr-3">Grid Size:</span>
          {[3, 4, 5].map(size => (
            <button
              key={size}
              onClick={() => changeGridSize(size)}
              disabled={isAnimating}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                gridSize === size 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {size}x{size}
            </button>
          ))}
        </div>
        
        {/* Game status */}
        <div className="text-xl font-semibold text-center mb-6 text-gray-700">
          {status}
        </div>

        {/* Game board - dynamic grid */}
        <div 
          className={`grid gap-2 mb-6 justify-center transition-all duration-500 ${
            isAnimating ? 'transform rotate-2 scale-95' : ''
          }`}
          style={{ 
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            maxWidth: 'fit-content',
            margin: '0 auto'
          }}
        >
          {board.map((square, i) => (
            <Square
              key={i}
              value={square}
              onClick={() => handleClick(i)}
              index={i}
            />
          ))}
        </div>

        {/* Game info */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Current Grid: {gridSize}x{gridSize} | Moves: {moveHistory.length} | Resets: {gamesReset}
          </p>
          
        </div>

        {/* Reset button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            disabled={isAnimating}
            className={`px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg
                     hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition-colors duration-200 ${
                       isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                     }`}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicTac;