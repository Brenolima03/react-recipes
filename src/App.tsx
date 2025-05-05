import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './components/pages/HomePage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/register-modal/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}

export default App
