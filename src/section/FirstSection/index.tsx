import { useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../../components/GameCard";
import ZoneDetailsModal from "../../components/ZoneDetailsModal";
import content from "../../data/content.json";
import { zoneDetails, type ZoneDetails } from "../../data/zoneDetails";
import { zonePresentation } from "../../data/zonePresentation";
import "./style.css";

function FirstSection() {
  const zones = content.home.zones;
  const [selectedZone, setSelectedZone] = useState<ZoneDetails | null>(null);

  const closeZoneDetails = () => setSelectedZone(null);

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
            <GameCard
              key={zone.title}
              title={zone.title}
              description={zone.description}
              image={zonePresentation[index].image}
              icon={zonePresentation[index].icon}
              variant={zonePresentation[index].variant}
              buttonText="Подробнее"
              onButtonClick={() => setSelectedZone(zoneDetails[index])}
            />
          ))}
        </div>
      </div>

      {selectedZone && (
        <ZoneDetailsModal zone={selectedZone} onClose={closeZoneDetails} />
      )}
    </section>
  );
}

export default FirstSection;
