import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/dashboard.css';
import '../styles/home.css'; // Reuse styles from home

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCard, setShowCard] = useState(false);

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

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCard(true);
  };

  const closeCard = () => {
    setShowCard(false);
    setSelectedDate(null);
  };

  return (
    <div className="home-container">
      {user ? (
        <>
          <h2 className="subtitle">Hiii {user.name}</h2>
          <p className="description">Welcome to your Daily Activity</p>

          <div className="calendar-wrapper">
            <Calendar onClickDay={handleDateClick} />
          </div>


          {showCard && (
            <div className="full-card-overlay">
              <div className="full-card">
                <h2>{selectedDate.toDateString()}</h2>
                <p>Add your activity for this date here...</p>
                <button className="btn" onClick={closeCard}>Close</button>
              </div>
            </div>
          )}
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
