import { useState } from 'react';
import Board from './components/Board';

export default function App() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), moveLocation: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const winnerInfo = calculateWinner(currentSquares);
  const winner = winnerInfo?.winner;
  const winningSquares = winnerInfo?.winningSquares || [];

  function handlePlay(nextSquares, moveIndex) {
    if (winner) {
      return;
    }

    const nextHistory = history.slice(0, currentMove + 1);
    const moveLocation = calculateMoveLocation(moveIndex);
    setHistory([...nextHistory, { squares: nextSquares, moveLocation }]);
    setCurrentMove(nextHistory.length);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function calculateMoveLocation(index) {
    const row = Math.floor(index / 3) + 1;
    const col = (index % 3) + 1;
    return `(${row}, ${col})`;
  }

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else if (currentSquares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const moves = history.map((step, move) => {
    const description = move > 0 
      ? `Go to move #${move} ${step.moveLocation ? `(${step.moveLocation})` : ''}`
      : 'Go to game start';
    
    if (move === currentMove) {
      return (
        <li key={move}>
          <span>You are at move #{move} {step.moveLocation}</span>
        </li>
      );
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={(nextSquares, index) => handlePlay(nextSquares, index)}
          winningSquares={winningSquares}
        />
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  return null;
}