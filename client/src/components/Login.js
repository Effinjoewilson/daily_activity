import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/form.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Welcome Back</h2>
      <p className="form-subtitle">Login to your Daily Activity account</p>
      <form onSubmit={handleSubmit}>
        <div className="form-fields">
            <input className="form-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
        </div>
            <button className="form-button" type="submit">Login</button>
      </form>
      <p className="link-text">
        New here?
        <a href="/signup">Create an account</a>
      </p>
    </div>
  );
}

export default Login;
