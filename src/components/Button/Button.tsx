// import React from "react";
import "./Button.module.scss";
import { props as AppProps } from "./Button.types";

const Button = ({ text, onClick, children }: AppProps) => {
  return (
    <button onClick={onClick}>
      {text}
      {children}
    </button>
  );
};

export default Button;
