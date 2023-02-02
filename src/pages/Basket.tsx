import React from "react";
import BasketCard from "../components/BasketCard";
import "./basket.css";
import payement from "../assets/images/payement.png";

export interface IData {
  data: {
    price: number;
    taille: string | null;
    duree: number;
    quantity: number;
  };
}

export interface IReservationList {
  reservations: IData[];
}

const Basket = () => {
  const test = {
    price: 65,
    taille: null,
    duree: 7,
    quantity: 1,
  };
  return (
    <div className="BasketPage">
      <div className="column-left">
        <BasketCard data={test} />
      </div>
      <div className="column-right">
        <div className="resumeCommande">
          <p>Résumé de votre commande :</p>
          <div className="totale">
            <p>Totale: 195,00 €</p>
          </div>
          <button className="btn-caisse">Passer à la caisse</button>
        </div>
        <div className="payement">
          <p>Nous acceptons :</p>
          <img src={payement} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Basket;
