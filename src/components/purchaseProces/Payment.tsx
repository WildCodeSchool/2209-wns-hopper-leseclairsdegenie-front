import React, {useContext, useEffect, useState} from "react";
import {MainContext} from "../../MainContexts";
import "./payment.css";
import StripeContainer from "../stripe/StripeContainer.js";

export interface IOnPay {
    onPay: () => {},
}

export function Payment(props: IOnPay): JSX.Element {
    const Main = useContext(MainContext);
    const [hidePrice, setHidePrice] = useState(false)

    const playHidePrice = () => {
        setHidePrice(true)
    }

    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const value = event.target.value;
        console.log(value);
    }

    useEffect(() => {
        Main?.refetch();
        console.log("user dans payment :", Main?.user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="paymentContainer">
            <div className="paymentContainer1">
                {!hidePrice && <div className="paymentContainer1a">
                    <div className="paymentInfoContainer">
                        <p className="paymentInfoTitle">Adresse de facturation</p>
                        <div className="paymentInfoContain">
                            {Main?.user?.cart.billingLastname}{" "}
                            {Main?.user?.cart.billingfirstname}
                            <br/>
                            {Main?.user?.cart.billingAdress}
                        </div>
                    </div>
                    <div className="paymentInfoContainer">
                        <p className="paymentInfoTitle">Adresse de livraison</p>
                        <div className="paymentInfoContain">
                            {Main?.user?.cart.deliveryLastname}{" "}
                            {Main?.user?.cart.deliveryfirstname}
                            <br/>
                            {Main?.user?.cart.deliveryAdress}
                        </div>
                    </div>
                </div>}
                <div className="paymentContainer1b">

                    <StripeContainer pay={() => props.onPay()} hide={() => playHidePrice()}/>

                </div>
                {
                    !hidePrice && <div className="totalePanierPayement">
                        <hr/>
                        <p>Totale : {Main?.user?.cart.totalePrice} €</p>
                    </div>
                }

            </div>
        </div>
    );
}
