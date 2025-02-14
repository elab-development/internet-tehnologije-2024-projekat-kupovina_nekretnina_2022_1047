import React from "react";
import "./Button.css";

const Button = ({ children, onClick, type = "button", className = "", disabled = false }) => {
  return (
    <button
      className={`btn-45 ${className} ${disabled ? "btn-disabled" : ""}`}
      onClick={!disabled ? onClick : undefined}
      type={type}
      disabled={disabled}
      style={{color:"black"}}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
