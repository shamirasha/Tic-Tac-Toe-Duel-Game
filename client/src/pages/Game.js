import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [playerSymbol, setPlayerSymbol] = useState('');
  const [winner, setWinner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const assigned = Math.random() > 0.5 ? 'X' : 'O';
    setPlayerSymbol(assigned);
  }, []);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = async (i) => {
    if (board[i] || winner) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const win = calculateWinner(newBoard);
    let result = null;

    if (win) {
      setWinner(win);
      result = win === playerSymbol ? 'win' : 'lose';
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
      result = 'draw';
    }

    if (result) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3002/api/game/result', { result }, {
          headers: { Authorization: token }
        });
      } catch (err) {
        console.error("Failed to update result:", err);
      }
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div style={{
      backgroundImage: "url('/images/bg4.png')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h1>Tic Tac Toe</h1>
        <h3>You are: {playerSymbol}</h3>
        <div style={{ marginBottom: '10px' }}>
          {winner ? (winner === 'Draw' ? 'Draw!' : `Winner: ${winner}`) : `Next: ${isXNext ? 'X' : 'O'}`}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '10px', justifyContent: 'center', margin: '20px 0' }}>
          {board.map((val, i) => (
            <button key={i} onClick={() => handleClick(i)} style={{ height: '80px', fontSize: '24px' }}>
              {val}
            </button>
          ))}
        </div>
        <div>
          <button onClick={resetGame}>Reset</button>
          <button onClick={() => navigate('/dashboard')} style={{ marginLeft: '10px' }}>Quit to Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Game;