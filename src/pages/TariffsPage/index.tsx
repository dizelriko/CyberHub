import ComparisonTable from "../../components/ComparisonTable";
import GameCard from "../../components/GameCard";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import { zonePresentation } from "../../data/zonePresentation";
import "./style.css";

const TariffsPage = () => {
  const tariffs = content.home.tariffs;
  const comparison = content.zonesPage.comparison;

  return (
    <div className="tariffs-page">
      <section className="tariffs-page__hero">
        <div className="container tariffs-page__hero-grid">
          <div>
            <PageLabel>{tariffs.label}</PageLabel>
            <h1>ТАРИФЫ <span>БЕЗ СКРЫТЫХ УСЛОВИЙ</span></h1>
            <p>Выбирай подходящую игровую зону и бронируй время заранее. Стоимость зависит от зоны, а всё оборудование уже включено.</p>
          </div>
          <div className="tariffs-page__hero-card" aria-hidden="true">
            <i className="bi bi-lightning-charge-fill"></i>
            <strong>ОТ 2000 ₸</strong>
            <span>ЗА ЧАС ИГРЫ</span>
          </div>
        </div>
      </section>

      <section className="tariffs-page__plans">
        <div className="container">
          <div className="section-heading">
            <div><PageLabel>ВЫБЕРИ ТАРИФ</PageLabel><h2>{tariffs.title}</h2></div>
          </div>
          <div className="tariffs-page__grid">
            {tariffs.items.map((tariff, index) => (
              <GameCard
                key={tariff.title}
                title={tariff.title}
                icon={zonePresentation[index].icon}
                variant={zonePresentation[index].variant}
                price={tariff.price}
                period={tariff.period}
                buttonText={tariff.button}
                buttonTo="/booking"
              >
                <ul className="tariffs-page__specs">
                  {tariff.specs.map((spec) => <li key={spec}><i className="bi bi-check2"></i>{spec}</li>)}
                </ul>
              </GameCard>
            ))}
          </div>
        </div>
      </section>

      <section className="tariffs-page__comparison">
        <div className="container">
          <PageLabel>{comparison.label}</PageLabel>
          <h2>{comparison.title}</h2>
          <ComparisonTable
            className="tariffs-page__table-wrap"
            headers={comparison.headers}
            rows={comparison.rows}
          />
        </div>
      </section>
    </div>
  );
};

export default TariffsPage;
