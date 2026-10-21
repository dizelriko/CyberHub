import { Link } from "react-router-dom";
import content from "../../data/content.json";
import { navigationItems } from "../../data/navigation";
import "./style.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <Link
              to="/"
              className="footer__logo"
            >
              <span className="footer__logo-icon">
                <i className="bi bi-controller"></i>
              </span>

              <span>
                {content.footer.logo}

                <small>
                  {content.footer.logoSubtitle}
                </small>
              </span>
            </Link>
          </div>

          <nav className="footer__nav">
            {navigationItems.map((item) => (
              <Link key={item.label} to={item.to}>{item.label}</Link>
            ))}
          </nav>

          <div className="footer__socials">
            <a href="#" aria-label="Telegram">
              <i className="bi bi-telegram"></i>
            </a>

            <a href="#" aria-label="Discord">
              <i className="bi bi-discord"></i>
            </a>

            <a href="#" aria-label="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            {content.footer.copyright}
          </span>

          <span>
            {content.footer.workingHours}
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
