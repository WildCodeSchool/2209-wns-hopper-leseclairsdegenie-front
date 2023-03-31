import React, { useContext, useEffect, useState } from "react";
import BasketCard from "../components/purchaseProces/BasketCard";
import "./basket.css";
import payement from "../assets/images/payement.png";
import { MainContext } from "../MainContexts";
import { addPriceCart } from "../graphql/cart";
import { useMutation } from "@apollo/client";

export interface IData {
  data: {
    endDate: Date | null;
    id: string;
    price: number;
    taille: string | null;
    duree: number;
    quantity: number;
    product: Object;
    startDate: Date | null;
    taxes: number | null;
  };
}

export interface IReservationList {
  reservations: IData[];
}

const Basket = ({ onValidateCart }: { onValidateCart: Function }) => {
  const Main = useContext(MainContext);
  const infoUser = Main?.user;
  const [doAddPriceCart, { loading, error }] = useMutation(addPriceCart);
  //const [totalePanier, setTotalePanier] = useState(0);
  const [noDisponibilityIncrement, setNoDisponibilityIncrement] = useState(0);
  const [nbReservations, setNbReservations] = useState(0);
  const [reservationsPanier, setReservationsPanier] = useState(
    Main?.user?.cart.reservations
  );
  let totalePanier = 0;

  reservationsPanier?.map((resa) => {
    return (totalePanier += resa.price);
  });

  const noDisponibilityProduct = () => {
    setNoDisponibilityIncrement(noDisponibilityIncrement + 1);
  };
  useEffect(() => {
    setReservationsPanier(Main?.user?.cart.reservations);
    if (Main?.user?.cart.reservations) {
      setNbReservations(Main?.user?.cart.reservations.length);
    }
  }, [Main?.user]);

  // useEffect(() => {
  //   doAddPriceCart({
  //     variables: {
  //       price: totalePanier,
  //     },
  //   });
  // }, [totalePanier]);

  return (
    <div className="BasketPage">
      <div className="column-left">
        {reservationsPanier && nbReservations > 0 ? (
          reservationsPanier.map((item) => {
            return (
              <BasketCard
                data={item}
                forDisponibility={() => noDisponibilityProduct()}
                key={item.id}
              />
            );
          })
        ) : (
          <div className="noReservation">
            <p>Vous n'avez pas de réservations dans votre panier</p>
            <a href="http://localhost:3000/products">
              Cliquez ici pour réserver
            </a>
          </div>
        )}
      </div>
      {nbReservations > 0 && noDisponibilityIncrement !== nbReservations && (
        <div className="column-right">
          <div className="resumeCommande">
            <p>Résumé de votre commande :</p>
            <div className="totale">
              <p>Totale: {totalePanier} €</p>
            </div>
            <button className="btn-caisse" onClick={() => onValidateCart()}>
              Passer à la caisse
            </button>
          </div>
          <div className="payement">
            <p>Nous acceptons :</p>
            <img src={payement} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Basket;
