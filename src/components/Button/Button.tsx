// import React from "react";
import "./Button.module.scss";
import { props as AppProps } from "./Button.types";

const Button = ({ text, onClick }: AppProps) => {
  return <button onClick={onClick}>{text}</button>;
};

export default Button;
