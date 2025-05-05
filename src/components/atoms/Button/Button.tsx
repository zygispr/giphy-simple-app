import type { ReactNode } from "react";
import "./Button.scss";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

function Button(props: ButtonProps) {
  return (
    <button className={`button ${props.className}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
