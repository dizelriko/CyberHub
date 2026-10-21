import { useState } from "react";
import GameCard from "../../components/GameCard";
import content from "../../data/content.json";
import "./style.css";

function SecondSection() {
  const tariffs = content.home.tariffs;

  const [selectedTime, setSelectedTime] = useState(
    tariffs.timeOptions[0]
  );

  const icons = [
    "bi-display",
    "bi-gem",
    "bi-people-fill",
    "bi-controller",
  ];

  const variants = [
    "blue",
    "yellow",
    "purple",
    "green",
  ] as const;

  return (
    <section className="tariffs-section">
      <div className="container">

        <div className="tariffs-section-header">
          <div>
            <div className="tariffs-section-label">
              <span></span>
              {tariffs.label}
            </div>

            <h2 className="tariffs-section-title">
              {tariffs.title}
            </h2>
          </div>

          <div className="tariffs-section-time">
            {tariffs.timeOptions.map((time) => (
              <button
                key={time}
                type="button"
                className={
                  selectedTime === time
                    ? "tariffs-section-time-button active"
                    : "tariffs-section-time-button"
                }
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="tariffs-section-grid">
          {tariffs.items.map((tariff, index) => (
            <GameCard
              key={tariff.title}
              title={tariff.title}
              icon={icons[index]}
              variant={variants[index]}
              price={tariff.price}
              period={tariff.period}
              buttonText={tariff.button}
              buttonTo="/booking"
            >
              <div className="tariff-specs">
                {tariff.specs.map((spec) => (
                  <div
                    key={spec}
                    className="tariff-spec"
                  >
                    <i className="bi bi-check2"></i>

                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </GameCard>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SecondSection;