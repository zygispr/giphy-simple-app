import Card, { type CardProps } from "../../molecules/Card/Card.tsx";
import "./CardContainer.scss";

interface CardContainerProps {
  cards: CardProps[];
}

function CardContainer(props: CardContainerProps) {
  return (
    <div className="card-container">
      {props.cards.map((card) => (
        <Card key={card.imgSrc} imgSrc={card.imgSrc} date={card.date} label={card.label} isLocked={card.isLocked} />
      ))}
    </div>
  );
}

export default CardContainer;
