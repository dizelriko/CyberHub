import { useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import Button from "../../components/Button";
import FaqList from "../../components/FaqList";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import {
  ALL_TIME_SLOTS,
  formatDateToISO,
  isTimeSlotPassed,
  getFirstAvailableTime,
} from "../../data/timeSlots";
import "./style.css";

const BookingPage = () => {
  const page = content.bookingPage;
  const [searchParams] = useSearchParams();

  const today = new Date();
  const todayISO = formatDateToISO(today);

  const initialDate = searchParams.get("date") || todayISO;
  const initialTime = searchParams.get("time");

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(() => {
    if (initialTime && !isTimeSlotPassed(initialTime, initialDate)) {
      return initialTime;
    }
    return getFirstAvailableTime(initialDate);
  });
  const [zone, setZone] = useState(searchParams.get("zone") || "STANDARD");
  const [seats, setSeats] = useState(Number(searchParams.get("seats")) || 1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    // Если текущее выбранное время для новой даты уже прошло — автоматически ставим ближайшее актуальное
    if (isTimeSlotPassed(time, newDate)) {
      setTime(getFirstAvailableTime(newDate));
    }
  };

  const decreaseSeats = () => setSeats((current) => Math.max(1, current - 1));
  const increaseSeats = () => setSeats((current) => current + 1);

  const submitBooking = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (isTimeSlotPassed(time, date)) {
      setErrorMessage("Выбранное время уже прошло. Пожалуйста, выберите актуальное время.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/create-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          userEmail: email,
          phone,
          date,
          time,
          zone,
          seats,
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ошибка при отправке заявки");
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : "Произошла ошибка при отправке заявки"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="container booking-hero__grid">
          <div>
            <PageLabel>{page.hero.label}</PageLabel>
            <h1>{page.hero.title}<span>{page.hero.accentTitle}</span></h1>
            <p>{page.hero.description}</p>
          </div>
          <div className="booking-hero__advantages">
            {page.hero.advantages.map((advantage) => (
              <div key={advantage}><i className="bi bi-check-circle-fill"></i>{advantage}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="booking-form-section" id="booking-form">
        <div className="container booking-form-section__grid">
          <div className="booking-form-section__intro">
            <span>01</span>
            <h2>{page.form.title}</h2>
            <p>{page.form.description}</p>
            <div className="booking-form-section__note"><i className="bi bi-lightning-charge-fill"></i><div><strong>Быстрое подтверждение</strong><small>Письмо с подтверждением придёт на вашу почту</small></div></div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <div className="booking-form__grid">
              {/* ВЫБОР ДАТЫ */}
              <div className="booking-form__field">
                <span>{page.form.fields.date}</span>
                <div className="booking-input-wrap">
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

              {/* ВЫБОР ВРЕМЕНИ */}
              <div className="booking-form__field">
                <span>{page.form.fields.time}</span>
                <div className="booking-input-wrap">
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
              <div className="booking-form__field">
                <span>{page.form.fields.zone}</span>
                <div className="booking-input-wrap">
                  <i className="bi bi-controller"></i>
                  <select value={zone} onChange={(e) => setZone(e.target.value)}>
                    <option value="STANDARD">STANDARD</option>
                    <option value="VIP">VIP</option>
                    <option value="BOOTCAMP">BOOTCAMP</option>
                    <option value="PS5 ZONE">PS5 ZONE</option>
                  </select>
                </div>
              </div>

              {/* МЕСТА */}
              <div className="booking-form__field">
                <span>{page.form.fields.seats}</span>
                <div className="booking-form__counter">
                  <button type="button" onClick={decreaseSeats} aria-label="Уменьшить количество мест">−</button>
                  <strong>{seats}</strong>
                  <button type="button" onClick={increaseSeats} aria-label="Увеличить количество мест">+</button>
                </div>
              </div>

              {/* ИМЯ */}
              <div className="booking-form__field">
                <span>{page.form.fields.name}</span>
                <div className="booking-input-wrap">
                  <i className="bi bi-person"></i>
                  <input
                    type="text"
                    placeholder={page.form.fields.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* ТЕЛЕФОН */}
              <div className="booking-form__field">
                <span>{page.form.fields.phone}</span>
                <div className="booking-input-wrap">
                  <i className="bi bi-telephone"></i>
                  <input
                    type="tel"
                    placeholder={page.form.fields.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="booking-form__field booking-form__wide">
                <span>{page.form.fields.email}</span>
                <div className="booking-input-wrap">
                  <i className="bi bi-envelope"></i>
                  <input
                    type="email"
                    placeholder={page.form.fields.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* КОММЕНТАРИЙ */}
              <label className="booking-form__wide">
                <span>{page.form.fields.comment}</span>
                <textarea
                  placeholder={page.form.fields.commentPlaceholder}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </label>
            </div>

            <button className="booking-form__submit" type="submit" disabled={isLoading}>
              <i className={`bi ${isLoading ? "bi-hourglass-split" : "bi-calendar-check"}`}></i>
              {isLoading ? "Отправка бронирования..." : page.form.button}
            </button>
            {isSubmitted && <p className="booking-form__success" role="status">✓ Заявка успешно оформлена! Подтверждение отправлено на {email}.</p>}
            {errorMessage && <p className="booking-form__error" role="alert" style={{ color: "#ff6b6b", marginTop: "14px", textAlign: "center" }}>{errorMessage}</p>}
          </form>
        </div>
      </section>

      <section className="contacts-section" id="contacts">
        <div className="container">
          <PageLabel>{page.contacts.label}</PageLabel>
          <div className="section-heading"><div><h2>{page.contacts.title}</h2><p>{page.contacts.description}</p></div></div>
          <div className="contacts-section__grid">
            <article>
              <i className="bi bi-telephone"></i>
              <span>{page.contacts.phone.title}</span>
              <a href={`tel:${page.contacts.phone.value.replace(/[^+\d]/g, '')}`}>{page.contacts.phone.value}</a>
              <p>{page.contacts.phone.description}</p>
              <Button href={`tel:${page.contacts.phone.value.replace(/[^+\d]/g, '')}`} variant="outline">Позвонить</Button>
            </article>
            <article>
              <i className="bi bi-whatsapp"></i>
              <span>{page.contacts.whatsapp.title}</span>
              <strong>WhatsApp</strong>
              <p>Быстрый ответ в чате</p>
              <Button href={page.contacts.whatsapp.url} target="_blank" rel="noopener noreferrer">{page.contacts.whatsapp.button}</Button>
            </article>
            <article>
              <i className="bi bi-telegram"></i>
              <span>{page.contacts.telegram.title}</span>
              <strong>{page.contacts.telegram.value}</strong>
              <p>Новости и поддержка</p>
              <Button href={page.contacts.telegram.url || "https://t.me/cyberhub_almaty"} target="_blank" rel="noopener noreferrer">{page.contacts.telegram.button}</Button>
            </article>
            <article>
              <i className="bi bi-geo-alt"></i>
              <span>{page.address.title}</span>
              <a href={page.address.url || "https://2gis.kz/almaty"} target="_blank" rel="noopener noreferrer">{page.address.value}</a>
              <p>{page.address.description}</p>
              <Button href={page.address.url || "https://2gis.kz/almaty"} target="_blank" rel="noopener noreferrer" variant="outline">{page.address.button}</Button>
            </article>
            <article>
              <i className="bi bi-clock"></i>
              <span>{page.workingHours.title}</span>
              <strong>{page.workingHours.time}</strong>
              <p>{page.workingHours.days} · {page.workingHours.description}</p>
            </article>
          </div>
          <div className="contacts-section__features">{page.features.map((feature) => <span key={feature}><i className="bi bi-check2"></i>{feature}</span>)}</div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container faq-section__grid">
          <div><PageLabel>{page.faq.label}</PageLabel><h2>{page.faq.title}</h2></div>
          <FaqList className="faq-section__list" items={page.faq.items} />
        </div>
      </section>

      <section className="booking-cta">
        <div className="container"><PageLabel>{page.cta.label}</PageLabel><p>{page.cta.description}</p><a className="button button--primary" href="#booking-form">{page.cta.button}<i className="bi bi-arrow-up"></i></a></div>
      </section>
    </div>
  );
};

export default BookingPage;
