/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Address } from "../components/Address";
import { Login } from "../components/connection/Login";
import { MainContext } from "../MainContexts";
import { IAddressOrder, IPurchaseProces } from "../interfaces";
import "./purchaseProces.css";

export function PurchaseProces() {
  const Main = useContext(MainContext);
  const [view, setView] = useState<IPurchaseProces>({
    cart: true,
    address: false,
    payment: false,
    confirmation: false,
  });
  const [address, setAddress] = useState<IAddressOrder>({
    delivery: {
      lastname: Main?.user?.lastname ? Main?.user?.lastname : "",
      firstname: Main?.user?.firstname ? Main?.user?.firstname : "",
      address: Main?.user?.deliveryAdress ? Main?.user?.deliveryAdress : "",
    },
  });

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
