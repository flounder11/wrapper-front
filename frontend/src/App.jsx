import './App.css'
import WrapperGenerator from './Components/WrapperGererator/WrapperGenerator'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
          <Route path="/" element={<WrapperGenerator />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
