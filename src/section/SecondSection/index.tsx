import { useState } from "react";
import { Link } from "react-router-dom";
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
            <article
              key={tariff.title}
              className={`tariff-card tariff-card-${index + 1}`}
            >
              <div className="tariff-card-title">
                <i className={`bi ${icons[index]}`}></i>

                <h3>{tariff.title}</h3>
              </div>

              <div className="tariff-card-price">
                <strong>{tariff.price}</strong>
                <span>{tariff.period}</span>
              </div>

              <div className="tariff-card-specs">
                {tariff.specs.map((spec) => (
                  <div
                    key={spec}
                    className="tariff-card-spec"
                  >
                    <i className="bi bi-check2"></i>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/booking"
                className="tariff-card-button"
              >
                {tariff.button}
              </Link>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

export default SecondSection;