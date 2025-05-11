import { useEffect, useState } from 'react';
import { useMealDataMutate } from '../../hooks/PostMeal';
import { MealData } from '../../interface/MealData';
import "./Modal.css";

interface InputProps {
  label: string,
  value: string | number,
  updateValue(value: any): void
}   

interface ModalProps {
  closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
  const isTextArea = label.toLowerCase() === "descrição"

  return (
    <>
      <label>{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={event => updateValue(event.target.value)}
          rows={4}
        />
      ) : (
        <input
          value={value}
          onChange={event => updateValue(event.target.value)}
        />
      )}
    </>
  )
}

export function CreateModal({ closeModal }: ModalProps){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const { mutate, isSuccess, isPending } = useMealDataMutate();

  const submit = () => {
    if (!name || !image || !description.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    const mealData: MealData = {
      name,
      image,
      description
    };
  
    mutate(mealData);
  }

  useEffect(() => {
    if(!isSuccess) return 
    closeModal();
  }, [isSuccess])

  return(
    <div className="modal-overlay">
      <div className="modal-body">
        <button
          onClick={closeModal}
          className="close-button"
        >
          ×
        </button>
        <h2>Nova receita</h2>
        <form className="input-container">
          <Input label="Nome" value={name} updateValue={setName}/>
          <Input label="URL da imagem" value={image} updateValue={setImage}/>
          <Input label="Descrição" value={description} updateValue={setDescription}/>
        </form>
        <button className="btn-secondary" onClick={submit}>
          {isPending ? "Postando..." : "Postar"}
        </button>
      </div>
    </div>
  )
}
