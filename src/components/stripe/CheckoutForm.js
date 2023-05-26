import React, {useContext, useEffect, useState} from 'react';
import {CardElement, LinkAuthenticationElement, PaymentElement, useElements, useStripe} from "@stripe/react-stripe-js";
import "./CheckoutForm.css"
import {MainContext} from "../../MainContexts";

const CheckoutForm = (props) => {

    const Main = useContext(MainContext);
    const stripe = useStripe()
    const elements = useElements()

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [playIcon, setPlayIcon] = useState(false)

    const Spinner = () => <div className="loader"></div>;

    console.log("props.data = ", props.data);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }
        else {
            console.log("clientSecret = ", clientSecret);
        }

        stripe.retrievePaymentIntent(props.data).then(({paymentIntent}) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);
    const displayIcon = () => {
        props.onPay()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setTimeout(displayIcon, 5000)
        setPlayIcon(true)
        props.onHide()
        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        /*const {error} = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        }
        else {
            console.log("error = ", error);
            setMessage("An unexpected error occurred.");
        }*/

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs"
    }

    return (
        <div>
            {playIcon ? <div className={"loadinContainer"}>
                    <div className="loader"></div>
                </div> :
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" options={paymentElementOptions}/>
                    <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Payer ma commande"}
        </span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </form>
            }
        </div>

    );
};

export default CheckoutForm;