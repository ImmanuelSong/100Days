import { useState } from "react";

const Square = ({ value, onSquareClick }) => {
  return (
    <>
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    </>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
  } else {
    status = "Next Player is " + (xIsNext ? "X" : "O");
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 3; j++) {
      <div>
        <Square value={squares[i]} onSquareClick={() => handleClick(i)} />
      </div>;
    }
  }

  return (
    <>
      <div className="status">{status}</div>
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            let index = row * 3 + col;
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [show, setShow] = useState(false);
  const [currentMove, setCurrentMove] = useState(0);
  const [reverse, setReverse] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    console.log(history);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };
  const moves = history.map((squares, move) => {
    let desc;
    if (move > 0) {
      desc = "Go to move #" + move;
    } else {
      desc = "Go to game Start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <p>Current Move is at {history.length - 1}</p>
        <button onClick={() => setShow(!show)}>History</button>
        <button onClick={() => setReverse(!reverse)}>Reverse</button>
        {!show ? null : reverse ? <ol>{moves.reverse()}</ol> : <ol>{moves}</ol>}
      </div>
    </div>
  );
};

export default Game;
