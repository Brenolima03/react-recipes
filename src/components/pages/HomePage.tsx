import { useState } from 'react'
import { isUserAdmin } from '../../hooks/Login'
import { useMealData } from '../../hooks/GetMeals'
import { Card } from '../card/Card'
import { CreateModal } from '../modals/PostMealModal'
import './HomePage.css'
import { MealData } from '../../interface/MealData'
import { MealCardModal } from '../modals/MealCardModal'

export function HomePage() {
  const { data } = useMealData()
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedMeal, setSelectedMeal] = useState<MealData | null>(null)
  const checkUserIsLoggedIn = () => {
    return localStorage.getItem("authToken")
  }

  const handleOpenCreateModal = () => {
    if (checkUserIsLoggedIn()) setIsCreateModalOpen(prev => !prev)
  }

  const handleCardClick = (meal: any) => {
    setSelectedMeal(meal)
  }

  const handleCloseViewModal = () => {
    setSelectedMeal(null)
  }

  return (
    <div className="container">
      <div className="card-grid">
        {(Array.isArray(data) ? data : []).map(mealData => (
          <Card
            key={mealData.id}
            name={mealData.name}
            description={mealData.description}
            image={mealData.image}
            onClick={() => handleCardClick(mealData)}
          />
        ))}
      </div>

      {isCreateModalOpen && <CreateModal closeModal={handleOpenCreateModal} />}

      {!isCreateModalOpen && isUserAdmin() && (
        <button onClick={handleOpenCreateModal}>Postar receita</button>
      )}

      {selectedMeal && (
        <MealCardModal
          name={selectedMeal.name}
          description={selectedMeal.description}
          image={selectedMeal.image}
          closeModal={handleCloseViewModal}
        />
      )}
    </div>
  )
}
