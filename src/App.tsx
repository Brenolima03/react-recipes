import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Header } from './components/header/Header'
import { HomePage } from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <main className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
