/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Address} from "../components/purchaseProces/Address";
import {MainContext} from "../MainContexts";
import {Notification} from "../components/Notification";
import {IAddressOrder, IPurchaseProces} from "../interfaces";
import "./purchaseProces.css";
import {Payment} from "../components/purchaseProces/Payment";
import {Confirmation} from "../components/purchaseProces/Confirmation";
import {useMutation} from "@apollo/client";
import {
    createOrder,
    updateCart,
    verifyReservationsList,
} from "../graphql/cart";
import indexTexts from "../assets/indexTexts.json";
import Basket from "./Basket";
import emailjs from "@emailjs/browser";

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

    const applyToPay = async () => {
        await toPay();
        setView({
            cart: false,
            address: false,
            payment: false,
            confirmation: true,
        });
    }

    const [doSaveReservations] = useMutation(verifyReservationsList);
    const verifyReservations = async () => {
        await Main?.refetch();
        try {
            const {data} = await doSaveReservations({
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
            const {data} = await doUpdateCart({
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
    const [doCreateOrder] = useMutation(createOrder);
    const toPay = async () => {
        try {
            const {data} = await doCreateOrder();
            if (data) {
                console.log("Je paie");
                console.log(data);

                const template = {
                    name: Main?.user?.firstname,
                    numCommande: data.createOrder.id,
                    email: Main?.user?.email
                }

                emailjs.send("service_5z6axm1", "template_b4rjqls", template, "LDnIbXDyCKC_9Ihg3").then(
                    (result) => {
                        console.log("L'email de confirmation est envoyé à :", template.email);
                        console.log(result.text);
                    },
                    (error) => {
                        console.log(error.text);
                        console.log(" L'email de confirmation n'a pas pû être envoyé !! ");
                    }
                );
                setOrderId(data.createOrder.id);
            } else {
                console.log("Je peux pas payer");
                setNotification(true);
            }
        } catch {
            console.log("error createOrder");
            setNotification(true);
        }
        // Ici post api createOrder, next setOrderId avec res => id new order
    };

    console.log(Main);
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
                {/* {view.cart && <Cart onValidateCart={() => verifyReservations()} />} */}
                {view.cart && <Basket onValidateCart={() => verifyReservations()}/>}
                {view.address && <Address address={address} setAddress={setAddress}/>}
                {view.payment && <Payment onPay={() => applyToPay()}/>}
                {view.confirmation && <Confirmation orderId={orderId}/>}
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
                        className={view.payment ? "noButtonPay" : "purchaseProcesButtonsNext"}
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
