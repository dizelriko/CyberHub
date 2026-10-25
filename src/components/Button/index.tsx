import type { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import "./style.css";

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  target?: string;
  rel?: string;
  variant?: "primary" | "outline";
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function Button({
  children,
  to,
  href,
  target,
  rel,
  variant = "primary",
  className = "",
  onClick,
}: ButtonProps) {
  const classes = `button button--${variant} ${className}`.trim();

  if (href) {
    const computedRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;
    return (
      <a href={href} className={classes} target={target} rel={computedRel}>
        {children}
      </a>
    );
  }

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
