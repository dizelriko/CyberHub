import { Link } from "react-router-dom";
import content from "../../data/content.json";
import "./style.css";

function FirstSection() {
  const zones = content.home.zones;

  const zoneImages = [
    "/images/standard.jpg",
    "/images/vip.jpg",
    "/images/bootcamp.jpg",
    "/images/ps5.jpg",
  ];

  const zoneIcons = [
    "bi-display",
    "bi-gem",
    "bi-people-fill",
    "bi-controller",
  ];

  return (
    <section className="zones-section">
      <div className="container">
        <div className="zones-section-header">
          <div>
            <div className="zones-section-label">
              <span></span>
              {zones.label}
            </div>

            <h2 className="zones-section-title">
              {zones.title}
            </h2>
          </div>

          <Link
            to="/zones"
            className="zones-section-link"
          >
            {zones.showAll}

            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="zones-section-grid">
          {zones.items.map((zone, index) => (
            <article
              key={zone.title}
              className={`zone-card zone-card-${index + 1}`}
            >
              <div className="zone-card-image">
                <img
                  src={zoneImages[index]}
                  alt={zone.title}
                />
              </div>

              <div className="zone-card-content">
                <div className="zone-card-title">
                  <i className={`bi ${zoneIcons[index]}`}></i>

                  <h3>{zone.title}</h3>
                </div>

                <p className="zone-card-description">
                  {zone.description}
                </p>

                <Link
                  to="/zones"
                  className="zone-card-button"
                  aria-label={`Открыть ${zone.title}`}
                >
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FirstSection;