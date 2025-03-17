import Square from './Square';

export default function Board({ xIsNext, squares, onPlay, winningSquares = [] }) {
  function handleClick(i) {
    if (squares[i] || winningSquares.length > 0) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  function isWinningSquare(index) {
    return winningSquares.includes(index);
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} isWinning={isWinningSquare(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} isWinning={isWinningSquare(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} isWinning={isWinningSquare(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} isWinning={isWinningSquare(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} isWinning={isWinningSquare(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} isWinning={isWinningSquare(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} isWinning={isWinningSquare(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} isWinning={isWinningSquare(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} isWinning={isWinningSquare(8)} />
      </div>
    </>
  );
}