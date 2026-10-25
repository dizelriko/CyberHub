import { useState } from "react";
import { useNavigate } from "react-router-dom";
import content from "../../data/content.json";
import {
  ALL_TIME_SLOTS,
  formatDateToISO,
  isTimeSlotPassed,
  getFirstAvailableTime,
} from "../../data/timeSlots";
import "./style.css";

function QuickBookingSection() {
  const booking = content.home.bookingCta;
  const navigate = useNavigate();

  const today = new Date();
  const todayISO = formatDateToISO(today);

  const [date, setDate] = useState(todayISO);
  const [time, setTime] = useState(() => getFirstAvailableTime(todayISO));
  const [zone, setZone] = useState("STANDARD");
  const [seats, setSeats] = useState(1);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    if (isTimeSlotPassed(time, newDate)) {
      setTime(getFirstAvailableTime(newDate));
    }
  };

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = new URLSearchParams({
      date,
      time,
      zone,
      seats: String(seats),
    }).toString();
    navigate(`/booking?${query}`);
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
              {/* ДАТА */}
              <div className="booking-section-field">
                <span>Дата</span>

                <div className="booking-section-input">
                  <i className="bi bi-calendar3"></i>

                  <input
                    type="date"
                    min={todayISO}
                    value={date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* ВРЕМЯ */}
              <div className="booking-section-field">
                <span>Время</span>

                <div className="booking-section-input">
                  <i className="bi bi-clock"></i>

                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  >
                    <option value="" disabled>Выберите время</option>
                    {ALL_TIME_SLOTS.map((group) => {
                      const availableTimes = group.times.filter((slot) => !isTimeSlotPassed(slot, date));
                      if (availableTimes.length === 0) return null;

                      return (
                        <optgroup key={group.group} label={group.group}>
                          {availableTimes.map((slot) => (
                            <option key={slot} value={slot}>
                              {slot}
                            </option>
                          ))}
                        </optgroup>
                      );
                    })}
                  </select>
                </div>
              </div>

              {/* ЗОНА */}
              <label className="booking-section-field">
                <span>Зона</span>

                <div className="booking-section-input">
                  <i className="bi bi-controller"></i>

                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                  >
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

              {/* МЕСТА */}
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

export default QuickBookingSection;