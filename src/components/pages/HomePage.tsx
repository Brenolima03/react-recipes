import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isUserAdmin, logout } from '../../hooks/Login'
import { useMealData } from '../../hooks/UseMealData'
import { Card } from '../card/Card'
import { CreateModal } from '../create-modal/CreateModal'

export function HomePage() {
  const { data } = useMealData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const checkUserIsLoggedIn = () => {
    return localStorage.getItem("authToken")
  }

  const handleOpenModal = () => {
    if (checkUserIsLoggedIn()) setIsModalOpen(prev => !prev)
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Receitas</h1>

        {checkUserIsLoggedIn() ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/register">
              <button>Cadastro</button>
            </Link>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </>
        )}
      </div>
      <div className="card-grid">
        {(Array.isArray(data) ? data : []).map(mealData => (
          <Card
            key={mealData.id}
            price={mealData.price}
            name={mealData.name}
            image={mealData.image}
          />
        ))}
      </div>

      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}

      {!isModalOpen && isUserAdmin() && (
        <button onClick={handleOpenModal}>Postar receita</button>
      )}
    </div>
  )
}
