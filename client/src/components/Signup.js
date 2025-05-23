import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) navigate('/login');
    else alert('Signup failed. Try again.');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Account</h2>
      <p className="form-subtitle">Join Daily Activity and start tracking!</p>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
            <input className="form-input" type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
  <button className="form-button" type="submit">Sign Up</button>
</form>

      <p className="link-text">
        Already have an account?
        <a href="/login">Login</a>
      </p>
    </div>
  );
}

export default Signup;
