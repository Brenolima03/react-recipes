import "./Card.css";

interface CardProps {
  price: number,
  name: string,
  image: string
}

export function Card({price, name, image} : CardProps) {
  return (
    <div className="card">
      <img src={image} alt="" />
      <h2>{name}</h2>
      <p>Valor: {price}</p>
    </div>
  )
}
