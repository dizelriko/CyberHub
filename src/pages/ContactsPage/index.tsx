import FaqList from "../../components/FaqList";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import "./style.css";

const ContactsPage = () => {
  const page = content.bookingPage;

  return (
    <div className="contacts-page">
      <section className="contacts-page__hero">
        <div className="container">
          <PageLabel>{page.contacts.label}</PageLabel>
          <h1>{page.contacts.title}<span>CYBERHUB РЯДОМ</span></h1>
          <p>{page.contacts.description}</p>
        </div>
      </section>

      <section className="contacts-page__cards">
        <div className="container">
          <div className="contacts-page__grid">
            <article>
              <i className="bi bi-telephone"></i>
              <span>{page.contacts.phone.title}</span>
              <a href={`tel:${page.contacts.phone.value.replace(/[^+\d]/g, '')}`}>{page.contacts.phone.value}</a>
              <p>{page.contacts.phone.description}</p>
              <a href={`tel:${page.contacts.phone.value.replace(/[^+\d]/g, '')}`}>Позвонить</a>
            </article>
            <article>
              <i className="bi bi-whatsapp"></i>
              <span>{page.contacts.whatsapp.title}</span>
              <a href={page.contacts.whatsapp.url} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              <p>Быстрый ответ в чате</p>
              <a href={page.contacts.whatsapp.url} target="_blank" rel="noopener noreferrer">{page.contacts.whatsapp.button}</a>
            </article>
            <article>
              <i className="bi bi-telegram"></i>
              <span>{page.contacts.telegram.title}</span>
              <a href={page.contacts.telegram.url || "https://t.me/cyberhub_almaty"} target="_blank" rel="noopener noreferrer">{page.contacts.telegram.value}</a>
              <p>Новости и поддержка</p>
              <a href={page.contacts.telegram.url || "https://t.me/cyberhub_almaty"} target="_blank" rel="noopener noreferrer">{page.contacts.telegram.button}</a>
            </article>
            <article>
              <i className="bi bi-geo-alt"></i>
              <span>{page.address.title}</span>
              <a href={page.address.url || "https://2gis.kz/almaty"} target="_blank" rel="noopener noreferrer">{page.address.value}</a>
              <p>{page.address.description}</p>
              <a href={page.address.url || "https://2gis.kz/almaty"} target="_blank" rel="noopener noreferrer">{page.address.button}</a>
            </article>
            <article>
              <i className="bi bi-clock"></i>
              <span>{page.workingHours.title}</span>
              <strong>{page.workingHours.time}</strong>
              <p>{page.workingHours.days} · {page.workingHours.description}</p>
            </article>
          </div>
          <div className="contacts-page__features">{page.features.map((feature) => <span key={feature}><i className="bi bi-check2"></i>{feature}</span>)}</div>
        </div>
      </section>

      <section className="contacts-page__faq">
        <div className="container contacts-page__faq-grid">
          <div><PageLabel>{page.faq.label}</PageLabel><h2>{page.faq.title}</h2></div>
          <FaqList className="contacts-page__faq-list" items={page.faq.items} />
        </div>
      </section>
    </div>
  );
};

export default ContactsPage;
