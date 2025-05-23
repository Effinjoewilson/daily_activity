import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // Simulated protected request
    if (!token) return;

    // Optional: make a secure backend call to validate token
    setUser({ name: "John Doe", email: "john@example.com" }); // mock data
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome to your Dashboard</h2>
      {user ? (
        <p>Hello, {user.name} ({user.email})</p>
      ) : (
        <p>Please log in to view this page</p>
      )}
    </div>
  );
};

export default Dashboard;
