import React, { useContext, useEffect, useState } from "react";
import BasketCard from "../components/purchaseProces/BasketCard";
import "./basket.css";
import payement from "../assets/images/payement.png";
import { MainContext } from "../MainContexts";
import { addPriceCart } from "../graphql/cart";
import { useMutation, useQuery } from "@apollo/client";
import { productsRandomList } from "../graphql/productQueries";
import { IProduct, IResevations } from "../interfaces";

export interface IData {
  data: IResevations;
}

const Basket = ({ onValidateCart }: { onValidateCart: Function }) => {
  const Main = useContext(MainContext);
  const [noDisponibilityIncrement, setNoDisponibilityIncrement] = useState(0);
  const [nbReservations, setNbReservations] = useState(0);
  const [reservationsPanier, setReservationsPanier] = useState(
    Main?.user?.cart.reservations
  );
  const { data: dataProduct } = useQuery<{
    productsRandom: IProduct[];
  }>(productsRandomList);
  const [productsRandomLists, setProductsRandomLists] = useState<
    IProduct[] | []
  >([]);
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

  useEffect(() => {
    if (dataProduct) {
      setProductsRandomLists(dataProduct.productsRandom);
      console.log("random ===>", productsRandomLists);
    }
  }, [dataProduct]);

  return (
    <div className="BasketPage">
      {reservationsPanier && nbReservations > 0 ? (
        <div className="product">
          <div className="reservaions">
            <div className="column-left">
              {reservationsPanier.map((item) => {
                return (
                  <BasketCard
                    data={item}
                    forDisponibility={() => noDisponibilityProduct()}
                    key={item.id}
                  />
                );
              })}
            </div>
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
          </div>

          {productsRandomLists && (
            <div className="proposition-container">
              <div className="texte-proposition">
                <p>Voici des articles qui peuvent vous interesser :</p>
              </div>
              <div className="proposition">
                {productsRandomLists.map((item) => {
                  return (
                    <BasketCard
                      data={item}
                      //forDisponibility={() => noDisponibilityProduct()}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="panier-vide">
          <div className="vide-container">
            <div className="vide">Pas d'articles dans le panier</div>
          </div>
          {productsRandomLists && (
            <div className="proposition-container">
              <div className="texte-proposition">
                <p>Voici des articles qui peuvent vous interesser :</p>
              </div>
              <div className="proposition">
                {productsRandomLists.map((item) => {
                  return (
                    <BasketCard
                      data={item}
                      //forDisponibility={() => noDisponibilityProduct()}
                      key={item.id}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      ;
    </div>
  );
};

export default Basket;
