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
        <Card key={card.id} {...card} onClick={props.onClick} />
      ))}
    </div>
  );
}

export default CardContainer;
