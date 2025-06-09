import React from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div style={{
      backgroundImage: "url('/images/bg1.png')",
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      textAlign: 'center'
    }}>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: '40px',
        borderRadius: '12px'
      }}>
        <h1>Welcome to Tic Tac Toe</h1>
        <Link to="/login"><button style={{ margin: '10px' }}>Login</button></Link>
        <Link to="/signup"><button style={{ margin: '10px' }}>Signup</button></Link>
      </div>
    </div>
  );
}