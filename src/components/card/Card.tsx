import "./Card.css";

interface CardProps {
  name: string;
  description: string;
  image: string;
  onClick: () => void;
}

export function Card({ name, description, image, onClick }: CardProps) {
  const truncatedDescription = description && description.length > 30 ? `${description.slice(0, 30)}...` : description;

  return (
    <div className="card" onClick={onClick}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p>{truncatedDescription}</p>
    </div>
  );
}
