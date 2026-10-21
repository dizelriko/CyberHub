import Button from "../../components/Button";
import ComparisonTable from "../../components/ComparisonTable";
import GameCard from "../../components/GameCard";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import { zonePresentation } from "../../data/zonePresentation";
import "./style.css";

const ZonesPage = () => {
  const page = content.zonesPage;

  return (
    <div className="zones-page">
      <section className="zones-hero">
        <div className="container zones-hero__grid">
          <div className="zones-hero__content">
            <PageLabel>{page.hero.label}</PageLabel>
            <h1 className="zones-hero__title">
              {page.hero.title}
              <span>{page.hero.accentTitle}</span>
            </h1>
            <p className="zones-hero__description">{page.hero.description}</p>
            <div className="zones-hero__actions">
              <Button to="/booking">
                <i className="bi bi-calendar3"></i>
                {page.hero.primaryButton}
              </Button>
              <a className="button button--outline" href="#comparison">
                <i className="bi bi-grid-3x3-gap"></i>
                {page.hero.secondaryButton}
              </a>
            </div>
          </div>

          <div className="zones-hero__visual" aria-hidden="true">
            <div className="zones-hero__screen">
              <i className="bi bi-controller"></i>
              <span>4 ЗОНЫ</span>
              <strong>ТВОЯ ИГРА — ТВОИ ПРАВИЛА</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="zones-catalog">
        <div className="container">
          <div className="section-heading">
            <div>
              <PageLabel>{page.zones.label}</PageLabel>
              <h2>{page.zones.title}</h2>
            </div>
            <a href="#comparison">{page.zones.compareButton}<i className="bi bi-arrow-down"></i></a>
          </div>

          <div className="zones-catalog__grid">
            {page.zones.items.map((zone, index) => (
              <GameCard
                key={zone.title}
                title={zone.title}
                icon={zonePresentation[index].icon}
                image={zonePresentation[index].image}
                description={zone.description}
                price={zone.price}
                period={zone.period}
                buttonText={zone.button}
                buttonTo="/booking"
                variant={zonePresentation[index].variant}
              >
                <ul className="zones-catalog__specs">
                  {zone.specs.map((spec) => (
                    <li key={spec}><i className="bi bi-check2"></i>{spec}</li>
                  ))}
                </ul>
              </GameCard>
            ))}
          </div>
        </div>
      </section>

      <section className="zones-comparison" id="comparison">
        <div className="container">
          <PageLabel>{page.comparison.label}</PageLabel>
          <h2>{page.comparison.title}</h2>
          <ComparisonTable
            className="zones-comparison__scroll"
            headers={page.comparison.headers}
            rows={page.comparison.rows}
          />
        </div>
      </section>

      <section className="zones-community">
        <div className="container zones-community__grid">
          <div>
            <PageLabel>{page.community.label}</PageLabel>
            <h2>{page.community.title}</h2>
            <p>{page.community.description}</p>
            <Button to="/booking">{page.community.button}<i className="bi bi-arrow-right"></i></Button>
          </div>
          <div className="zones-community__features">
            {page.community.advantages.map((advantage, index) => (
              <article key={advantage}>
                <span>0{index + 1}</span>
                <i className="bi bi-trophy"></i>
                <h3>{advantage}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZonesPage;
