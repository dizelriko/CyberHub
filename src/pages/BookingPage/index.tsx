import { useState, type FormEvent } from "react";
import Button from "../../components/Button";
import FaqList from "../../components/FaqList";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import "./style.css";

const BookingPage = () => {
  const page = content.bookingPage;
  const [seats, setSeats] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const decreaseSeats = () => setSeats((current) => Math.max(1, current - 1));
  const increaseSeats = () => setSeats((current) => current + 1);
  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
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
            <div className="booking-form-section__note"><i className="bi bi-lightning-charge-fill"></i><div><strong>Быстрое подтверждение</strong><small>Мы свяжемся с вами после отправки формы</small></div></div>
          </div>

          <form className="booking-form" onSubmit={submitBooking}>
            <div className="booking-form__grid">
              <label><span>{page.form.fields.date}</span><input type="date" required /></label>
              <label><span>{page.form.fields.time}</span><input type="time" required /></label>
              <label><span>{page.form.fields.zone}</span><select defaultValue="STANDARD"><option>STANDARD</option><option>VIP</option><option>BOOTCAMP</option><option>PS5 ZONE</option></select></label>
              <div className="booking-form__field"><span>{page.form.fields.seats}</span><div className="booking-form__counter"><button type="button" onClick={decreaseSeats} aria-label="Уменьшить количество мест">−</button><strong>{seats}</strong><button type="button" onClick={increaseSeats} aria-label="Увеличить количество мест">+</button></div></div>
              <label><span>{page.form.fields.name}</span><input type="text" placeholder={page.form.fields.namePlaceholder} autoComplete="name" required /></label>
              <label><span>{page.form.fields.phone}</span><input type="tel" placeholder={page.form.fields.phonePlaceholder} autoComplete="tel" required /></label>
              <label className="booking-form__wide"><span>{page.form.fields.comment}</span><textarea placeholder={page.form.fields.commentPlaceholder}></textarea></label>
            </div>
            <button className="booking-form__submit" type="submit"><i className="bi bi-calendar-check"></i>{page.form.button}</button>
            {isSubmitted && <p className="booking-form__success" role="status">Заявка принята. Мы свяжемся с вами для подтверждения.</p>}
          </form>
        </div>
      </section>

      <section className="contacts-section" id="contacts">
        <div className="container">
          <PageLabel>{page.contacts.label}</PageLabel>
          <div className="section-heading"><div><h2>{page.contacts.title}</h2><p>{page.contacts.description}</p></div></div>
          <div className="contacts-section__grid">
            <article><i className="bi bi-telephone"></i><span>{page.contacts.phone.title}</span><a href="tel:+77771234567">{page.contacts.phone.value}</a><p>{page.contacts.phone.description}</p></article>
            <article><i className="bi bi-whatsapp"></i><span>{page.contacts.whatsapp.title}</span><strong>WhatsApp</strong><Button to="/booking">{page.contacts.whatsapp.button}</Button></article>
            <article><i className="bi bi-telegram"></i><span>{page.contacts.telegram.title}</span><strong>{page.contacts.telegram.value}</strong><Button to="/booking">{page.contacts.telegram.button}</Button></article>
            <article><i className="bi bi-geo-alt"></i><span>{page.address.title}</span><strong>{page.address.value}</strong><p>{page.address.description}</p></article>
            <article><i className="bi bi-clock"></i><span>{page.workingHours.title}</span><strong>{page.workingHours.time}</strong><p>{page.workingHours.days} · {page.workingHours.description}</p></article>
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
