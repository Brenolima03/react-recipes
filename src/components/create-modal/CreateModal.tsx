import { useEffect, useState } from 'react';
import { useMealDataMutate } from '../../hooks/UseMealDataMutate';
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
  return (
    <>
      <label>{label}</label>
      <input
        value={value}
        onChange={event => updateValue(event.target.value)}>
      </input>
    </>
  )
}

export function CreateModal({ closeModal }: ModalProps){
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { mutate, isSuccess, isPending } = useMealDataMutate();

  const submit = () => {
    const numericPrice = Number(price.replace(',', '.'));

    if (!name || !image || numericPrice <= 0 || isNaN(numericPrice)) {
      alert("Preencha todos os campos.");
      return;
    }

    const mealData: MealData = {
      name,
      price: numericPrice,
      image
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
            <Input label="Preço" value={price} updateValue={setPrice}/>
            <Input label="URL da imagem" value={image} updateValue={setImage}/>
        </form>
        <button className="btn-secondary" onClick={submit}>
          {isPending ? "Postando..." : "Postar"}
        </button>
      </div>
    </div>
  )
}
