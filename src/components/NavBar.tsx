import { Link } from "react-router";
import { faMoon,faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function NavBar() {

  const [ligthTheme,setTheme]= useState(true);
  return (
    <div className="nav">
      <div className="brand">
        <div className="brand-logo"></div>

        <Link to="/movies">
          <strong>IMTV</strong>
        </Link>
      </div>
      <div className="nav-btn">
        <ul>
          <li className="primary">
            <Link to="/movies">MOVIES</Link>
          </li>
          <li className="secondary">
            <Link to="/tv">TV</Link>
          </li>
        </ul>
      </div>
      <div className="colorTheme">
        <button className="theme-btn"
         onClick={() => {
          document.body.classList.toggle('themeDark');
          setTheme((prev) => !prev)}} >

            {
            ligthTheme? <FontAwesomeIcon icon={faSun} className="icon-theme ligth"/> :
                      <FontAwesomeIcon icon={faMoon} className="icon-theme dark"/>
          }
            
        </button>
      </div>
    </div>
  );
}
