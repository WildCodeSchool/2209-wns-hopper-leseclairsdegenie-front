import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/logo3.png";
import { MainContext } from "../../MainContexts";

const Navbar = () => {
  const Main = useContext(MainContext);
  const logout = () => {
    Main?.setUser(undefined);
    localStorage.removeItem("token");
    Main?.refetch();
  };
  console.log("test ici " + Main?.user?.id);
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
          <Link to="purchaseProces">Panier</Link>
        </li>
        <li>
          {Main?.user?.id ? (
            <button type="button" onClick={() => logout()}>
              Déconnexion
            </button>
          ) : (
            <Link to="connection">Connexion</Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
