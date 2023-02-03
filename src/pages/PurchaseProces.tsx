/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Address } from "../components/Address";
import { MainContext } from "../MainContexts";
import { Notification } from "../components/Notification";
import { IAddressOrder, IPurchaseProces } from "../interfaces";
import "./purchaseProces.css";
import { Payment } from "../components/Payment";
import { Confirmation } from "../components/Confirmation";
import { Cart } from "../components/Cart";
import { useMutation } from "@apollo/client";
import { updateCart, verifyReservationsList } from "../graphql/cart";
import indexTexts from "../assets/indexTexts.json";

export function PurchaseProces() {
  const navigate = useNavigate();
  const Main = useContext(MainContext);
  const [notification, setNotification] = useState(false);
  const [orderId, setOrderId] = useState<number | undefined>();
  const [view, setView] = useState<IPurchaseProces>({
    cart: true,
    address: false,
    payment: false,
    confirmation: false,
  });
  // un useeffect si view.cart o view.payment true, update cart avec les infos de address
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
      lastname: Main?.user?.cart.billingLastname
        ? Main?.user?.cart.billingLastname
        : Main?.user?.lastname
        ? Main?.user?.lastname
        : "",
      firstname: Main?.user?.cart.billingfirstname
        ? Main?.user?.cart.billingfirstname
        : Main?.user?.firstname
        ? Main?.user?.firstname
        : "",
      address: Main?.user?.cart.billingAdress
        ? Main?.user?.cart.billingAdress
        : Main?.user?.deliveryAdress
        ? Main?.user?.deliveryAdress
        : "",
    },
  });

  const [doSaveReservations] = useMutation(verifyReservationsList);
  const verifyReservations = async () => {
    await Main?.refetch();
    try {
      const { data } = await doSaveReservations({
        variables: {
          id: Main?.user?.cart.id,
        },
      });
      if (data.verifyReservationsList) {
        console.log(data);
        setView({
          cart: false,
          address: true,
          payment: false,
          confirmation: false,
        });
        console.log("Alls reservations are availables");
      } else {
        console.log("A reservaton is not available");
        setNotification(true);
      }
    } catch {
      console.log("error updateCart");
      setNotification(true);
    }
  };

  const [doUpdateCart] = useMutation(updateCart);
  const saveAddress = async () => {
    await Main?.refetch();
    try {
      const { data } = await doUpdateCart({
        variables: {
          data: {
            billingfirstname: address.billing?.firstname,
            billingLastname: address.billing?.lastname,
            billingAdress: address.billing?.address,
            deliveryfirstname: address.delivery?.firstname,
            deliveryLastname: address.delivery?.lastname,
            deliveryAdress: address.delivery?.address,
          },
          id: Main?.user?.cart.id,
        },
      });
      if (data) {
        console.log("Cart Modified");
      } else {
        console.log("Cart Not Modified");
        setNotification(true);
      }
    } catch {
      console.log("error updateCart");
      setNotification(true);
    }
  };
  const toPay = () => {
    console.log("Je paie");
    // Ici post api createOrder, next setOrderId avec res => id new order
    setOrderId(0);
  };
  console.log(Main?.user);
  return (
    <div className="purchaseProcesContainer">
      {notification && (
        <Notification
          icon="error"
          type="validation"
          message={
            Main?.user
              ? indexTexts.purchaseProcesNotificationMessage
              : "Connectez vous ou créez un compte !"
          }
          textButton={
            Main?.user
              ? indexTexts.purchaseProcesNotificationTextButton
              : "Aller à la page de connexion"
          }
          onValidate={() => {
            if (!Main?.user) {
              navigate("/connection");
            } else {
              window.location.reload();
            }
          }}
        />
      )}
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
        {view.cart && <Cart onValidateCart={() => verifyReservations()} />}
        {view.address && <Address address={address} setAddress={setAddress} />}
        {view.payment && <Payment />}
        {view.confirmation && <Confirmation orderId={orderId} />}
      </div>
      {!view.cart && !view.confirmation && (
        <div className="purchaseProcesButtonsContainer">
          <button
            onClick={async () => {
              if (view.address) {
                await saveAddress();
                await Main?.refetch();
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
            onClick={async () => {
              if (view.address) {
                await saveAddress();
                await Main?.refetch();
                setView({
                  cart: false,
                  address: false,
                  payment: true,
                  confirmation: false,
                });
              }
              if (view.payment) {
                await toPay();
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
          <button
            onClick={async () => {
              await Main?.refetch();
              navigate("/");
            }}
            className="purchaseProcesButtonsNext"
          >
            Revenir à la page d'acceuil
          </button>
        </div>
      )}
    </div>
  );
}
