import { useState } from 'react'
import { isUserAdmin } from '../../hooks/Login'
import { useMealData } from '../../hooks/UseMealData'
import { Card } from '../card/Card'
import { CreateModal } from '../create-modal/CreateModal'
import './HomePage.css'

export function HomePage() {
  const { data } = useMealData()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const checkUserIsLoggedIn = () => {
    return localStorage.getItem("authToken")
  }

  const handleOpenModal = () => {
    if (checkUserIsLoggedIn()) setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
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
