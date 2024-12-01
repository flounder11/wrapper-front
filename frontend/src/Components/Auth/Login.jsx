import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signin', {
        username,
        password,
      });
      console.log('Login successful:', response.data);
      // Сохранение токена в localStorage
      localStorage.setItem('token', response.data);
      // Перенаправление на страницу генератора после успешного входа
      navigate('/generator');
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="auth-container">
      <h2>Авторизация</h2>
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
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="loginButton">
          <button type="submit" className="button primary">
            Авторизоваться
          </button>
        </div>
      </form>
      <div className="register-link">
        <button onClick={handleRegisterClick} className="button secondary">
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default Login;