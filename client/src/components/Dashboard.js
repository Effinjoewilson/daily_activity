import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/dashboard.css';
import '../styles/home.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [activityText, setActivityText] = useState('');
  const [loadingActivity, setLoadingActivity] = useState(false);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:5000/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    fetch('https://wttr.in/?format=j1')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.error('Weather fetch error:', err));
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowCard(true);
    fetchActivity(date);
  };

  const fetchActivity = (date) => {
    setLoadingActivity(true);
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5000/api/activity?date=${date.toISOString().split('T')[0]}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => (res.ok ? res.json() : Promise.reject()))
      .then(data => {
        setActivityText(data.content || '');
        setLoadingActivity(false);
      })
      .catch(() => {
        setActivityText('');
        setLoadingActivity(false);
      });
  };

  const saveActivity = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:5000/api/activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: selectedDate.toISOString().split('T')[0],
        content: activityText,
      }),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to save');
        alert('Activity saved successfully!');
        setShowCard(false);
      })
      .catch(() => alert('Error saving activity'));
  };

  const closeCard = () => {
    setShowCard(false);
    setSelectedDate(null);
    setActivityText('');
  };

  return (
    <div className="home-container">
      {user ? (
        <>
          <h2 className="subtitle">Hiii {user.name}</h2>
          <p className="description">Welcome to your Daily Activity</p>

          <div className="dashboard-center">
            <div className="calendar-wrapper">
              <Calendar onClickDay={handleDateClick} />
            </div>

            <div className="weather-box">
              <h3>Current Weather</h3>
              {weather ? (
                <>
                  <p><strong>Location:</strong> {weather.nearest_area[0].areaName[0].value}</p>
                  <p><strong>Temperature:</strong> {weather.current_condition[0].temp_C}°C</p>
                  <p><strong>Condition:</strong> {weather.current_condition[0].weatherDesc[0].value}</p>
                </>
              ) : (
                <p>Loading weather...</p>
              )}
            </div>
          </div>

          {showCard && (
            <div className="full-card-overlay">
              <div className="full-card">
                <h2>{selectedDate.toDateString()}</h2>
                {loadingActivity ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    <textarea
                      rows={8}
                      value={activityText}
                      onChange={e => setActivityText(e.target.value)}
                      style={{ width: '100%', fontSize: '1rem' }}
                      placeholder="Add your activity for this date here..."
                    />
                    <div style={{ marginTop: '15px' }}>
                      <button className="btn" onClick={saveActivity}>Save</button>{' '}
                      <button className="btn" onClick={closeCard}>Close</button>
                    </div>
                  </>
                )}
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
