import React, { useContext, useEffect } from "react";
import { MainContext } from "../../MainContexts";
import "./payment.css";

export function Payment(): JSX.Element {
  const Main = useContext(MainContext);

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;
    console.log(value);
  }
  useEffect(() => {
    Main?.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="paymentContainer">
      <div className="paymentContainer1">
        <div className="paymentContainer1a">
          <div className="paymentInfoContainer">
            <p className="paymentInfoTitle">Adresse de facturation</p>
            <div className="paymentInfoContain">
              {Main?.user?.cart.billingLastname}{" "}
              {Main?.user?.cart.billingfirstname}
              <br />
              {Main?.user?.cart.billingAdress}
            </div>
          </div>
          <div className="paymentInfoContainer">
            <p className="paymentInfoTitle">Adresse de livraison</p>
            <div className="paymentInfoContain">
              {Main?.user?.cart.deliveryLastname}{" "}
              {Main?.user?.cart.deliveryfirstname}
              <br />
              {Main?.user?.cart.deliveryAdress}
            </div>
          </div>
        </div>
        <div className="paymentContainer1b">
          <div className="paymentModeContainer">
            <p className="paymentInfoTitle">Mode de paiment</p>
            <select onChange={handleSelectChange} className="paymentSelect">
              <option value="one" className="paymentOption">
                VISA
              </option>
              <option value="two" className="paymentOption">
                MasteCard
              </option>
              <option value="two" className="paymentOption">
                Visa Electron
              </option>
              <option value="three" className="paymentOption">
                American Express
              </option>
            </select>
          </div>
          <form className="paymentForm">
            <div className="paymentFormFieldContainer">
              <p>Nº Carte*</p>
              <input
                className="paymentFormField"
                type="text"
                value={"4012 0010 3714 1112"}
                onChange={() => {}}
              />
            </div>
            <div className="paymentFormFieldContainer">
              <p>Nom sur la carte*</p>
              <input
                className="paymentFormField"
                type="text"
                value={"Ana LOPEZ"}
                onChange={() => {}}
              />
            </div>
            <div className="paymentFormFieldContainer">
              <p>Date d'expiration</p>
              <input
                type="date"
                className="paymentFormField"
                value={"2024-09-29"}
                onChange={() => {}}
              />
            </div>
            <div className="paymentFormFieldContainer">
              <p>Code de sécurité</p>
              <input
                className="paymentFormField paymentFormFieldCode"
                type="text"
                value={"125"}
                onChange={() => {}}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="paymentContainer2">details</div>
    </div>
  );
}
