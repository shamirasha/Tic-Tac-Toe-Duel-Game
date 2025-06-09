import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    draws: 0,
    points: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:3002/api/game/score', {
          headers: { Authorization: token }
        });
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        if (error.response?.status === 401) {
          navigate('/login');
        }
      }
    };

    fetchStats();
  }, [navigate]);

  const handleNewGame = () => navigate('/game');
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{
      backgroundImage: "url('/images/bg3.png')",
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
        padding: '50px',
        borderRadius: '12px',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={cardStyle}><h3>Games Played</h3><p>{stats.gamesPlayed}</p></div>
          <div style={cardStyle}><h3>Points</h3><p>{stats.points}</p></div>
          <div style={cardStyle}><h3>Wins</h3><p>{stats.wins}</p></div>
          <div style={cardStyle}><h3>Losses</h3><p>{stats.losses}</p></div>
          <div style={cardStyle}><h3>Draws</h3><p>{stats.draws}</p></div>
        </div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={handleNewGame}>New Game</button>
          <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

const cardStyle = {
  padding: '20px',
  backgroundColor: '#222',
  borderRadius: '8px',
  textAlign: 'center'
};

export default Dashboard;
