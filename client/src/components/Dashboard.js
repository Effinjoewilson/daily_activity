import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="home-container">
      {user ? (
        <>
          <h2 className="subtitle">Hiii {user.name}</h2>
          <p className="description">Welcome to your Daily Activity</p>
        </>
      ) : (
        <>
          <h2 className="subtitle">Unauthorized</h2>
          <p className="description">Please log in to view this page</p>
        </>
      )}
    </div>
  );
};

export default Dashboard;
