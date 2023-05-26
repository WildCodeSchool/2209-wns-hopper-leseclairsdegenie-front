import React, {useEffect, useState} from "react";
import {loadStripe} from '@stripe/stripe-js';
import {CardElement, Elements} from '@stripe/react-stripe-js'
import CheckoutForm from "./CheckoutForm.js";
import {useLazyQuery, useQuery} from "@apollo/client";
import {paymentConfirmation} from "../../graphql/payment";


const PUBLIC_KEY = "pk_test_51NBJpJHYnCsITcxUeXIgQAne5MhgkZ7LfuHPVGPtnCj3IHgMDnN0cpGDwAiwvdL2jDZMmHVt71Iyyw28evldumUw003KqBRJ0G"
const stripePromise = loadStripe(PUBLIC_KEY)


const Stripe = (props) => {

    const [getPayment, {data, loading}] = useLazyQuery(paymentConfirmation)

    const [clientSecret, setClientSecret] = useState("");

    /*const {error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)
    })
    if(!error){
        console.log("paymentMethod = ", paymentMethod);
        try {

        }
    }*/


    useEffect(() => {
        getPayment()
        if (data) {
            console.log("data = ", data.confirmPayment);
            setClientSecret(data.confirmPayment)
        }

    }, [data]);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="payement">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm data={clientSecret} onPay={() => props.pay()} onHide={() => props.hide()}/>
                </Elements>
            )}
        </div>
    )
}

export default Stripe;