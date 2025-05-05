import Button, { type ButtonProps } from "../../atoms/Button/Button.tsx";
import type { ReactNode } from "react";
import "./IconButton.scss";

interface IconButtonProps extends ButtonProps {
  icon: ReactNode;
}

function IconButton(props: IconButtonProps) {
  return (
    <>
      <Button className="icon-button" onClick={props.onClick}>
        {props.icon}
        {props.children}
      </Button>
    </>
  );
}

export default IconButton;
