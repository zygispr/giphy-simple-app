import "./Card.scss";
import LockIcon from "../../atoms/LockIcon/LockIcon.tsx";
import LockOpenIcon from "../../atoms/LockOpenIcon/LockOpenIcon.tsx";

export interface CardProps {
  id: string;
  date?: string;
  label?: string;
  imgSrc: string;
  isLocked?: boolean;
  onClick?: (id: string) => void;
}

function Card(props: CardProps) {
  return (
    <div className="card" id={props.id}>
      <img className="card__img" src={props.imgSrc} alt={props.label || "GIF"} onClick={() => props.onClick?.(props.id)} />
      {props.isLocked !== undefined && <div className="card__lock">{props.isLocked ? <LockIcon /> : <LockOpenIcon />}</div>}
      {props.date && <div className="card__date">{props.date}</div>}
      {props.label && <div className="card__label">{props.label}</div>}
    </div>
  );
}

export default Card;
