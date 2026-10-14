import Button from "../../components/Button";
import content from "../../data/content.json";
import "./style.css";

function CoverSection() {
  const hero = content.home.hero;

  return (
    <section className="cover-section">
      <div className="container">
        <div className="cover-section-grid">

          <div className="cover-section-content">
            <div className="cover-section-label">
              <span></span>
              {hero.label}
            </div>

            <h1 className="cover-section-title">
              {hero.title}

              <span>
                {hero.accentTitle}
              </span>
            </h1>

            <p className="cover-section-description">
              {hero.description}
            </p>

            <div className="cover-section-actions">
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

            <div className="cover-section-stats">
              {hero.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="cover-section-stat"
                >
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="cover-section-visual">
            <div className="cover-section-glow"></div>

            <div className="cover-section-orbit cover-section-orbit-one">
              <span></span>
            </div>

            <div className="cover-section-orbit cover-section-orbit-two">
              <span></span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default CoverSection;