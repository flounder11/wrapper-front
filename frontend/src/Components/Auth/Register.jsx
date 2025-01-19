import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Regestration.css"

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', { username, email, password });
    try {
      const response = await axios.post('http://localhost:8081/auth/signup', {
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
      // Очистка localStorage после успешной регистрации
      localStorage.clear();
      // Перенаправление на страницу входа после успешной регистрации
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      alert('Registration failed. Please try again.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="registerButton">
          <button type="submit" className="button primary">
            Регистрация
          </button>
        </div>
      </form>
      <div className="login-link">
        <button onClick={handleLoginClick}>
          Войти
        </button>
      </div>
    </div>
  );
};

export default Register;