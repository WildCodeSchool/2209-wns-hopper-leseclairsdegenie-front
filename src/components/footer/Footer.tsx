import React from "react";
import "./Footer.css";
import logo from "../../assets/images/logo3.png";

const Footer = () => {
  return (
    <footer className="footer">
      <ul className="footermenu">
      <li>
          {" "}
          <a href="/">
            <img
              className="logo"
              src={logo}
              alt="black runner silhouette on green"
            ></img>
          </a>
        </li>
        <li>
          <p>Copyright © {new Date().getFullYear()} WildRent</p>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
