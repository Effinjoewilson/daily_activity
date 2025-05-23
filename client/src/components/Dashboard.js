import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    //console.log("Token:", token);
    if (!token) return;

    fetch('http://localhost:5000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => {
        //console.log("User data received:", data);
        setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  return (
    <div className="dashboard">
      {user ? (
        <>
          <h2>Hiii {user.name}</h2>
          <p>Welcome to your Daily Activity</p>
        </>
      ) : (
        <p>Please log in to view this page</p>
      )}
    </div>
  );
};

export default Dashboard;
