import Card, { type CardProps } from "../../molecules/Card/Card.tsx";
import "./CardContainer.scss";

interface CardContainerProps {
  cards: CardProps[];
  onClick?: (id: string) => void;
}

function CardContainer(props: CardContainerProps) {
  return (
    <div className="card-container">
      {props.cards.map((card) => (
        <Card id={card.id} key={card.id} imgSrc={card.imgSrc} date={card.date} label={card.label} isLocked={card.isLocked} onClick={props.onClick} />
      ))}
    </div>
  );
}

export default CardContainer;
