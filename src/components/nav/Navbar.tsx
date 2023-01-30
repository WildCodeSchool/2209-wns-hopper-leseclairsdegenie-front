import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo3.png";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="menu">
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
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="products">Produits</Link>
        </li>
        <li>
          <Link to="reservations">Réservations</Link>
        </li>
        <li>
          <Link to="cart">Panier</Link>
        </li>
        <li >
          <Link to="signup">
          Connexion
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
