import { useState } from "react";
import ComparisonTable from "../../components/ComparisonTable";
import GameCard from "../../components/GameCard";
import PageLabel from "../../components/PageLabel";
import content from "../../data/content.json";
import { zonePresentation } from "../../data/zonePresentation";
import "./style.css";

const TariffsPage = () => {
  const tariffs = content.home.tariffs;
  const comparison = content.zonesPage.comparison;
  const [selectedTime, setSelectedTime] = useState(tariffs.timeOptions[0]);

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

            <div className="tariffs-page__time">
              {tariffs.timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={
                    selectedTime === time
                      ? "tariffs-page__time-button active"
                      : "tariffs-page__time-button"
                  }
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          <div className="tariffs-page__grid">
            {tariffs.items.map((tariff, index) => {
              const pricing = (
                tariff as unknown as {
                  prices?: Record<
                    string,
                    { price: string; period: string; discount?: string }
                  >;
                }
              ).prices?.[selectedTime];

              const price = pricing?.price || tariff.price;
              const period = pricing?.period || tariff.period;
              const badge = pricing?.discount;

              return (
                <GameCard
                  key={tariff.title}
                  title={tariff.title}
                  icon={zonePresentation[index].icon}
                  variant={zonePresentation[index].variant}
                  price={price}
                  period={period}
                  badge={badge}
                  buttonText={tariff.button}
                  buttonTo="/booking"
                >
                  <ul className="tariffs-page__specs">
                    {tariff.specs.map((spec) => <li key={spec}><i className="bi bi-check2"></i>{spec}</li>)}
                  </ul>
                </GameCard>
              );
            })}
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
