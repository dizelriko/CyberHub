import { useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Button from "../Button";
import type { ZoneDetails } from "../../data/zoneDetails";
import "./style.css";

interface ZoneDetailsModalProps {
  zone: ZoneDetails;
  onClose: () => void;
}

const ZoneDetailsModal = ({ zone, onClose }: ZoneDetailsModalProps) => {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleDialogKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])",
      );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleDialogKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleDialogKeyDown);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  const closeFromBackdrop = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="zone-modal" onMouseDown={closeFromBackdrop}>
      <section
        ref={dialogRef}
        className={`zone-modal__dialog zone-modal__dialog--${zone.variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="zone-modal-title"
      >
        <button
          ref={closeButtonRef}
          className="zone-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Закрыть подробности зоны"
        >
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="zone-modal__media">
          <img src={zone.image} alt={zone.title} />
        </div>

        <div className="zone-modal__content">
          <span className="zone-modal__eyebrow">{zone.tagline}</span>
          <h2 id="zone-modal-title">{zone.title}</h2>
          <p>{zone.description}</p>

          <div className="zone-modal__facts">
            <div><i className="bi bi-people"></i><span>Размещение</span><strong>{zone.seats}</strong></div>
            <div><i className="bi bi-stars"></i><span>Лучше всего</span><strong>{zone.bestFor}</strong></div>
          </div>

          <ul>
            {zone.equipment.map((item) => (
              <li key={item}><i className="bi bi-check2"></i>{item}</li>
            ))}
          </ul>

          <Button to="/booking">
            <i className="bi bi-calendar3"></i>
            Забронировать эту зону
          </Button>
        </div>
      </section>
    </div>,
    document.body,
  );
};

export default ZoneDetailsModal;
