/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Address } from "../components/Address";
import { Login } from "../components/Login";
import { MainContext } from "../MainContexts";
import { IAddressOrder, IPurchaseProces } from "../interfaces";
import "./purchaseProces.css";

export function PurchaseProces() {
  const Main = useContext(MainContext);
  useEffect(() => {
    Main?.refetch();
  }, []);
  console.log(Main?.user);
  const [view, setView] = useState<IPurchaseProces>({
    cart: true,
    address: false,
    payment: false,
    confirmation: false,
  });dsfdsf
  // un useeffect si view.cart o view.payment true update cart con las infos de address
  const [address, setAddress] = useState<IAddressOrder>({
    delivery: {
      lastname: Main?.user?.cart.deliveryLastname
        ? Main?.user?.cart.deliveryLastname
        : Main?.user?.lastname
        ? Main?.user?.lastname
        : "",
      firstname: Main?.user?.cart.deliveryfirstname
        ? Main?.user?.cart.deliveryfirstname
        : Main?.user?.firstname
        ? Main?.user?.firstname
        : "",
      address: Main?.user?.cart.deliveryAdress
        ? Main?.user?.cart.deliveryAdress
        : Main?.user?.deliveryAdress
        ? Main?.user?.deliveryAdress
        : "",
    },
    billing: {
      lastname: Main?.user?.cart.deliveryLastname
        ? Main?.user?.cart.deliveryLastname
        : Main?.user?.lastname
        ? Main?.user?.lastname
        : "",
      firstname: Main?.user?.cart.deliveryfirstname
        ? Main?.user?.cart.deliveryfirstname
        : Main?.user?.firstname
        ? Main?.user?.firstname
        : "",
      address: Main?.user?.cart.deliveryAdress
        ? Main?.user?.cart.deliveryAdress
        : Main?.user?.deliveryAdress
        ? Main?.user?.deliveryAdress
        : "",
    },
  });
  console.log(address);
  return (
    <div className="purchaseProcesContainer">
      <div className="purchaseProcesBarStatusContainer">
        <div
          style={{
            borderTopLeftRadius: "25px",
            borderBottomLeftRadius: "25px",
          }}
          className={
            view.cart
              ? "purchaseProcesBarStatusItemOn"
              : "purchaseProcesBarStatusItemOff"
          }
        >
          Panier
        </div>
        <div
          className={
            view.address
              ? "purchaseProcesBarStatusItemOn"
              : "purchaseProcesBarStatusItemOff"
          }
        >
          Adresse
        </div>
        <div
          className={
            view.payment
              ? "purchaseProcesBarStatusItemOn"
              : "purchaseProcesBarStatusItemOff"
          }
        >
          Paiment
        </div>
        <div
          style={{
            borderTopRightRadius: "25px",
            borderBottomRightRadius: "25px",
          }}
          className={
            view.confirmation
              ? "purchaseProcesBarStatusItemOn"
              : "purchaseProcesBarStatusItemOff"
          }
        >
          Confirmation
        </div>
      </div>
      <div className="purchaseProcesContainContainer">
        {view.cart && (
          <Login
            onTokenChange={() =>
              setView({
                cart: false,
                address: true,
                payment: false,
                confirmation: false,
              })
            }
          />
        )}
        {view.address && <Address address={address} setAddress={setAddress} />}
        {view.payment && <Login onTokenChange={() => {}} />}
        {view.confirmation && <Login onTokenChange={() => {}} />}
      </div>
      {!view.cart && !view.confirmation && (
        <div className="purchaseProcesButtonsContainer">
          <button
            onClick={() => {
              if (view.address) {
                setView({
                  cart: true,
                  address: false,
                  payment: false,
                  confirmation: false,
                });
              }
              if (view.payment) {
                setView({
                  cart: false,
                  address: true,
                  payment: false,
                  confirmation: false,
                });
              }
            }}
            className="purchaseProcesButtonsBack"
          >
            Précédent
          </button>
          <button
            onClick={() => {
              if (view.address) {
                setView({
                  cart: false,
                  address: false,
                  payment: true,
                  confirmation: false,
                });
              }
              if (view.payment) {
                setView({
                  cart: false,
                  address: false,
                  payment: false,
                  confirmation: true,
                });
              }
            }}
            className="purchaseProcesButtonsNext"
          >
            {view.payment ? "Payer ma commande" : "Continuer"}
          </button>
        </div>
      )}
      {view.confirmation && (
        <div className="purchaseProcesButtonsContainer2">
          <button onClick={() => {}} className="purchaseProcesButtonsNext">
            Revenir à la page d'acceuil
          </button>
        </div>
      )}
    </div>
  );
}
