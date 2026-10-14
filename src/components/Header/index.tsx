import { NavLink, Link } from "react-router-dom";
import Button from "../Button";
import content from "../../data/content.json";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link
            to="/"
            className="header__logo"
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
            >
              <i className="bi bi-calendar3"></i>

              <span>
                {content.header.bookingButton}
              </span>
            </Button>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavigation"
              aria-controls="mainNavigation"
              aria-expanded="false"
              aria-label="Открыть меню"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="mainNavigation"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                >
                  {content.header.navigation.home}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/zones"
                >
                  {content.header.navigation.zones}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/zones"
                >
                  {content.header.navigation.tariffs}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/booking"
                >
                  {content.header.navigation.booking}
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/booking"
                >
                  {content.header.navigation.contacts}
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;