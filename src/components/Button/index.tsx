import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  variant?: "primary" | "outline";
  className?: string;
}

function Button({
  children,
  to,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const classes = `button button--${variant} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}

export default Button;