import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/users/leaderboard');
        const sorted = res.data.sort((a, b) => b.points - a.points); // Sort by points descending
        setData(sorted);
      } catch (err) {
        console.error("Failed to load leaderboard", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div style={{
      backgroundImage: "url('/images/bg5.png')",
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
        textAlign: 'center',
        width: '90%',
        maxWidth: '700px'
      }}>
        <h1>Leaderboard</h1>
        <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>Back</button>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Points</th>
              <th>Wins</th>
              <th>Games</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, i) => (
              <tr key={i} style={{ backgroundColor: i % 2 === 0 ? '#333' : '#222' }}>
                <td>{i + 1}</td>
                <td>{user.username}</td>
                <td>{user.points}</td>
                <td>{user.wins}</td>
                <td>{user.gamesPlayed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
