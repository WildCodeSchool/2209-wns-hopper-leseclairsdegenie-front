import React, {useContext} from "react";
import check from "../../assets/images/check.svg";
import "./confirmation.css";
import {MainContext} from "../../MainContexts";

export function Confirmation({
                                 orderId,
                             }: {
    orderId: number | undefined;
}): JSX.Element {
    const Main = useContext(MainContext);

    return (
        <div className="confirmationContainer">
            <img src={check} alt="check"/>
            <p className="confirmationTitle">Paiment reçus !</p>
            <div className="confirmationMessageContainer">
                <p>
                    Votre commande <strong>WR-{orderId}</strong> a bien été engeristré.
                </p>
                <p>
                    Un email de confirmation vous a été envoyé sur cette adresse mail : {Main?.user?.email} avec tous
                    les détails de votre commande.
                </p>
            </div>
        </div>
    );
}
