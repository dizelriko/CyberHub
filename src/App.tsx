import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header/index";
import ScrollToLocation from "./components/ScrollToLocation";
import HomePage from "./pages/HomePage/index";
import ZonesPage from "./pages/ZonesPage/index";
import TariffsPage from "./pages/TariffsPage/index";
import BookingPage from "./pages/BookingPage/index";
import ContactsPage from "./pages/ContactsPage/index";
import Footer from "./components/Footer/index";

function App() {
  return (
    <>
      <ScrollToLocation />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/zones" element={<ZonesPage />} />
          <Route path="/tariffs" element={<TariffsPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
