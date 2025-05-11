import "./Card.css";

interface CardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

export function Card({ name, description, image, onClick }: CardProps) {
  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{description.length > 30 ? `${description.slice(0, 30)}...` : description}</p>
    </div>
  );
}
