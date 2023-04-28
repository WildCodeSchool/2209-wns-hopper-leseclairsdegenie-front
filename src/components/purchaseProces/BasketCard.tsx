import React, { useState, useEffect, useContext } from "react";
import ski from "../../assets/images/ski.jpg";
import "./basketCard.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IData } from "../../pages/Basket";
import { useMutation } from "@apollo/client";
import { deleteReservation } from "../../graphql/reservations";
import { MainContext } from "../../MainContexts";
import { me } from "../../graphql/connection";

export interface IDataProps {
  data: IData[] | null;
}

const BasketCard = (props: any) => {
  const [doDeleteReservation, { loading, error }] = useMutation(
    deleteReservation,
    { refetchQueries: [me], awaitRefetchQueries: true }
  );

  const Main = useContext(MainContext);

  const deleteResa = async () => {
    const { data } = await doDeleteReservation({
      variables: {
        id: props.data.id,
      },
    });
  };
  console.log(props);
  // const incrementQuantity = () => {
  //   setQuantity(quantity + 1);
  // };
  // const decrementQuantity = () => {
  //   if (quantity - 1 > 0) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  const addTotalePanier = () => {
    if (props.data.forDisponibility) {
      if (!props.data.product.disponibility) {
        props.forDisponibility();
      }
    }
  };

  useEffect(() => {
    addTotalePanier();
  }, []);

  return (
    <div className={props.data.product ? "BasketCard" : "BasketCardPub"}>
      {props.data.product ? (
        <div>
          <div className="nameProduct">
            <p>{props.data.product.name}</p>
            <hr />
          </div>

          <div className="detail">
            <div className="image">
              <img src={ski} alt="ski" />
            </div>
            {props.data.taille && (
              <div className="taille">
                <p>Taille : {props.data.taille}</p>
              </div>
            )}

            <div className="duree">
              <p>Durée : {props.data.nbJours} jours</p>
            </div>
            <div className="prix">
              <p>Prix : {props.data.product.price},00 € / j‎</p>
            </div>
            {/* <div className="quantite">
          <div className="plusMoins">
            <button
              className="btn-quantity"
              onClick={() => {
                incrementQuantity();
              }}
            >
              +
            </button>
          </div>
          <div>
            <p>{quantity}</p>
          </div>
          <div className="plusMoins">
            <button
              className="btn-quantity"
              onClick={() => {
                decrementQuantity();
              }}
            >
              −
            </button>
          </div>
        </div> */}
            <div className="quantite">
              <p>Quantité : {props.data.quantity}</p>
            </div>
            <div className="totaleReservation">
              <p>Totale : {props.data.price} €</p>
            </div>
            <div className="supprimer">
              <button
                onClick={() => {
                  deleteResa();
                }}
              >
                <RiDeleteBin5Fill className="svg-delete" />
              </button>
            </div>
          </div>

          <div className="warning">
            {!props.data.product.disponibility && (
              <p className="red">
                Ce produit n'est plus disponible pour le moment.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="productPub">
          <div className="nameProduct">
            <p>{props.data.name}</p>
          </div>
          <div className="detailPub">
            <div className="image">
              <img src={ski} alt="ski" />
            </div>
          </div>
          <a href="localhost:3000/product">Découvrir</a>
        </div>
      )}
    </div>
  );
};

export default BasketCard;
