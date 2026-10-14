import Button from "../../components/Button";
import content from "../../data/content.json";
import "./style.css";

function CoverSection() {
  const hero = content.home.hero;

  return (
    <section className="cover-section">
      <div className="container">
        <div className="cover-section__grid">
          <div className="cover-section__content">
            <div className="cover-section__label">
              <span></span>
              {hero.label}
            </div>

            <h1 className="cover-section__title">
              {hero.title}

              <span>
                {hero.accentTitle}
              </span>
            </h1>

            <p className="cover-section__description">
              {hero.description}
            </p>

            <div className="cover-section__actions">
              <Button to="/booking">
                <i className="bi bi-calendar3"></i>
                {hero.primaryButton}
              </Button>

              <Button
                to="/zones"
                variant="outline"
              >
                <i className="bi bi-play-fill"></i>
                {hero.secondaryButton}
              </Button>
            </div>

            <div className="cover-section__advantages">
              {hero.advantages.slice(0, 3).map((item) => (
                <div key={item}>
                  <span className="cover-section__advantage-icon">
                    <i className="bi bi-check2"></i>
                  </span>

                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cover-section__visual">
            <div className="cover-section__glow"></div>

            <div className="cover-section__orbit cover-section__orbit--one">
              <span></span>
            </div>

            <div className="cover-section__orbit cover-section__orbit--two">
              <span></span>
            </div>
{/* 
            <img
              src={hero.image}
              alt="Компьютерный клуб CYBERHUB"
              className="cover-section__image"
            /> */}

            <div className="cover-section__floating-card">
              <strong>RTX 40</strong>
              <span>Игровые ПК</span>
            </div>

            <div className="cover-section__floating-dot cover-section__floating-dot--one"></div>

            <div className="cover-section__floating-dot cover-section__floating-dot--two"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoverSection;