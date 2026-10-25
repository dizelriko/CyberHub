import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Button from "../Button";
import content from "../../data/content.json";
import { navigationItems } from "../../data/navigation";
import "./style.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [prevPathname, setPrevPathname] = useState(location.pathname);

  // Закрывать меню при смене страницы во время рендера
  if (prevPathname !== location.pathname) {
    setPrevPathname(location.pathname);
    setIsMenuOpen(false);
  }

  // Закрывать по клавише Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link
            to="/"
            className="header__logo"
            onClick={closeMenu}
          >
            <span className="header__logo-icon">
              <i className="bi bi-controller"></i>
            </span>

            <span className="header__logo-text">
              {content.header.logo}
              <small>
                {content.header.logoSubtitle}
              </small>
            </span>
          </Link>

          <div className="header__actions order-lg-3">
            <Button
              to="/booking"
              className="header__booking"
              onClick={closeMenu}
            >
              <i className="bi bi-calendar3"></i>

              <span>
                {content.header.bookingButton}
              </span>
            </Button>

            <button
              className={`navbar-toggler ${isMenuOpen ? "" : "collapsed"}`}
              type="button"
              onClick={toggleMenu}
              aria-controls="mainNavigation"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className={`collapse navbar-collapse justify-content-center ${isMenuOpen ? "show" : ""}`}
            id="mainNavigation"
          >
            <ul className="navbar-nav">
              {navigationItems.map((item) => (
                <li className="nav-item" key={item.label}>
                  {item.marksCurrentRoute ? (
                    <NavLink
                      className="nav-link"
                      to={item.to}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </NavLink>
                  ) : (
                    <Link
                      className="nav-link"
                      to={item.to}
                      onClick={closeMenu}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
