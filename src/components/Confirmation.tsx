import React from "react";
import check from "../assets/images/check.svg";
import "./confirmation.css";

export function Confirmation({
  orderId,
}: {
  orderId: number | undefined;
}): JSX.Element {
  return (
    <div className="confirmationContainer">
      <img src={check} alt="check" />
      <p className="confirmationTitle">Paiment reçus !</p>
      <div className="confirmationMessageContainer">
        <p>
          Votre commande <strong>WR-{orderId}</strong> a bien été engeristré.
        </p>
        <p>
          Vous receverez un e-mail de confirmation avec tous les détails de
          votre commande.
        </p>
      </div>
    </div>
  );
}
