import './App.css';
import WrapperGenerator from './Components/WrapperGererator/WrapperGenerator';
import Login from './Components/Auth/Login';
import Register from './Components/Auth/Register';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/public/logo.png" alt="Логотип" />
        </div>
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/generator" element={<WrapperGenerator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;