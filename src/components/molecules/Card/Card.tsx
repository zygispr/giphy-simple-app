import "./Card.scss";
import LockIcon from "../../atoms/LockIcon/LockIcon.tsx";
import LockOpenIcon from "../../atoms/LockOpenIcon/LockOpenIcon.tsx";

export interface CardProps {
  date?: string;
  label?: string;
  imgSrc: string;
  isLocked?: boolean;
}

function Card(props: CardProps) {
  return (
    <div className="card">
      <img className="card__img" src={props.imgSrc} alt={props.label || "GIF"} />
      {props.isLocked !== undefined && <div className="card__lock">{props.isLocked ? <LockIcon /> : <LockOpenIcon />}</div>}
      {props.date && <div className="card__date">{props.date}</div>}
      {props.label && <div className="card__label">{props.label}</div>}
    </div>
  );
}

export default Card;
