import { Link } from "react-router";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NavBar() {
  const [ligthTheme, setTheme] = useState(true);
  return (
    <div className="nav">
      <div className="brand">
        <Link to="/movies">
          <div className="brand-logo"></div>
          <strong>IMTV</strong>
        </Link>
      </div>
      <div className="nav-btn">
        <ul>
          <Link to="/movies" className="primary">
            <li>MOVIES</li>
          </Link>
          <Link to="/tv" className="secondary">
            <li>TV</li>
          </Link>
        </ul>
      </div>
      <div className="colorTheme">
        <button
          className="theme-btn"
          onClick={() => {
            document.body.classList.toggle("themeDark");
            setTheme((prev) => !prev);
          }}
        >
          {ligthTheme ? (
            <FontAwesomeIcon icon={faSun} className="icon-theme " />
          ) : (
            <FontAwesomeIcon icon={faMoon} className="icon-theme " />
          )}
        </button>
      </div>
    </div>
  );
}
