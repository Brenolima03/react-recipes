import "./Modal.css";

export interface MealCardModalProps {
  name: string;
  description: string;
  image: string;
  closeModal: () => void;
}

export function MealCardModal({ name, description, image, closeModal }: MealCardModalProps) {
  return (
    <div className="modal-overlay" onClick={closeModal}>  {/* Close on background click */}
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>  {/* Prevent background click from closing modal */}
        <button onClick={closeModal} className="close-button">×</button>
        <img src={image} alt={name} />
        <h2>{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
