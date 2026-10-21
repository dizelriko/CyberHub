import type { ReactNode } from "react";
import Button from "../Button";
import "./style.css";

interface GameCardProps {
  title: string;
  icon: string;
  image?: string;
  description?: string;
  price?: string;
  period?: string;
  children?: ReactNode;
  buttonText?: string;
  buttonTo?: string;
  onButtonClick?: () => void;
  variant?: "blue" | "yellow" | "purple" | "green";
}

function GameCard({
  title,
  icon,
  image,
  description,
  price,
  period,
  children,
  buttonText,
  buttonTo,
  onButtonClick,
  variant = "blue",
}: GameCardProps) {
  return (
    <article className={`game-card game-card-${variant}`}>
      {image && (
        <div className="game-card-image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="game-card-content">
        <div className="game-card-title">
          <i className={`bi ${icon}`}></i>
          <h3>{title}</h3>
        </div>

        {description && (
          <p className="game-card-description">
            {description}
          </p>
        )}

        {price && (
          <div className="game-card-price">
            <strong>{price}</strong>

            {period && (
              <span>{period}</span>
            )}
          </div>
        )}

        {children}

        {buttonText && (buttonTo || onButtonClick) && (
          <Button
            to={buttonTo}
            onClick={onButtonClick}
            variant="outline"
            className="game-card-button"
          >
            {buttonText}
          </Button>
        )}
      </div>
    </article>
  );
}

export default GameCard;
