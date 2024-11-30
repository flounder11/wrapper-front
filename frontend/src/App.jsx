import './App.css'
import WrapperGenerator from './Components/WrapperGererator/WrapperGenerator'

function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src="/public/logo.png" alt="Логотип" />
        </div>
      </header>
      <WrapperGenerator />
    </div>
  )
}

export default App
