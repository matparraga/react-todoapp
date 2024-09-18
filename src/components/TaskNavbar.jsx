import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

export default function TaskNavbar({ children }) {
  return (
    <>
      <header className="header">
        <a href="#" className="header__logo">
          Logo
        </a>
        <nav className="header__navbar">
          <ul className="header__list">
            <li className="header__list-item">
              <a className="header__item-link" href="#">
                Inicio
              </a>
            </li>
            <li className="header__list-item">
              <a className="header__item-link" href="#">
                Tareas realizadas
              </a>
            </li>
            <li className="header__list-item">
              <a className="header__item-link" href="#">
                Tareas eliminadas
              </a>
            </li>
          </ul>
        </nav>
        <div className="header__themeIcon">
          <FontAwesomeIcon icon={faMoon} />
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}
