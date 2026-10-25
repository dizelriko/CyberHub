import CoverSection from "../../section/CoverSection";
import ZonesPreviewSection from "../../section/ZonesPreviewSection";
import TariffsPreviewSection from "../../section/TariffsPreviewSection";
import QuickBookingSection from "../../section/QuickBookingSection";

function HomePage() {
  return (
    <>
      <CoverSection />
      <ZonesPreviewSection />
      <TariffsPreviewSection />
      <QuickBookingSection />
    </>
  );
}

export default HomePage;