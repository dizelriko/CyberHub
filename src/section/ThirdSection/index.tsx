import { useState } from "react";
import content from "../../data/content.json";
import "./style.css";

function ThirdSection() {
  const booking = content.home.bookingCta;

  const [seats, setSeats] = useState(1);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="booking-section">
      <div className="booking-section-overlay"></div>

      <div className="container">
        <div className="booking-section-grid">
          <div className="booking-section-content">
            <div className="booking-section-label">
              <span></span>
              {booking.label}
            </div>

            <h2 className="booking-section-title">
              {booking.title}
            </h2>

            <p className="booking-section-description">
              {booking.description}
            </p>
          </div>

          <form
            className="booking-section-form"
            onSubmit={handleSubmit}
          >
            <div className="booking-section-fields">
              <label className="booking-section-field">
                <span>Дата</span>

                <div className="booking-section-input">
                  <i className="bi bi-calendar3"></i>

                  <input
                    type="date"
                    required
                  />
                </div>
              </label>

              <label className="booking-section-field">
                <span>Время</span>

                <div className="booking-section-input">
                  <i className="bi bi-clock"></i>

                  <input
                    type="time"
                    required
                  />
                </div>
              </label>

              <label className="booking-section-field">
                <span>Зона</span>

                <div className="booking-section-input">
                  <i className="bi bi-controller"></i>

                  <select defaultValue="STANDARD">
                    <option value="STANDARD">
                      STANDARD
                    </option>

                    <option value="VIP">
                      VIP
                    </option>

                    <option value="BOOTCAMP">
                      BOOTCAMP
                    </option>

                    <option value="PS5 ZONE">
                      PS5 ZONE
                    </option>
                  </select>
                </div>
              </label>

              <div className="booking-section-field">
                <span>Количество мест</span>

                <div className="booking-section-counter">
                  <button
                    type="button"
                    onClick={() =>
                      setSeats((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                  >
                    −
                  </button>

                  <strong>{seats}</strong>

                  <button
                    type="button"
                    onClick={() =>
                      setSeats((current) => current + 1)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="booking-section-button"
            >
              <i className="bi bi-calendar3"></i>

              {booking.button}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ThirdSection;