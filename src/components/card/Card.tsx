import "./Card.css";

interface CardProps {
  price: number,
  name: string,
  image: string
}

export function Card({price, name, image} : CardProps) {
  // Truncate the price to two decimal places without rounding
  const truncatedPrice = Math.floor(price * 100) / 100;

  // Format the price as a string with two decimal places
  const formattedPrice = truncatedPrice % 1 === 0 ?
    truncatedPrice.toFixed(0) : truncatedPrice.toFixed(2).replace(/\.00$/, '');

  return (
    <div className="card">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>Valor: R${formattedPrice}</p>
    </div>
  )
}
