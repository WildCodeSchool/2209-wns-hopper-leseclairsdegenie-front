import React, { useState } from "react";
import "./login.css";
import { useMutation } from "@apollo/client";
import { signin } from "../graphql/connection";
import { Notification } from "./Notification";
import indexTexts from "../assets/indexTexts.json";
import eye from "../assets/oeil.png";
import { IAddressComponent } from "../interfaces";

export function Address({
  address,
  setAddress,
}: IAddressComponent): JSX.Element {
  return (
    <div className="addressContainer">
      <p>Adresse de facturation</p>
      <form className="addressForm">
        <div className="addressFormFieldContainer">
          <p>Nom</p>
          <input
            className="addressFormField"
            type="text"
            value={address.billing?.lastname}
            onChange={(e) =>
              setAddress({
                ...address,
                billing: { ...address.billing, lastname: e.target.value },
              })
            }
          />
        </div>
        <div className="addressFormFieldContainer">
          <p>Prénom</p>
          <input
            className="addressFormField"
            type="text"
            value={address.billing?.firstname}
            onChange={(e) =>
              setAddress({
                ...address,
                billing: { ...address.billing, firstname: e.target.value },
              })
            }
          />
        </div>
        <div className="addressFormFieldContainer">
          <p>Adresse</p>
          <input
            className="addressFormFieldAddress"
            type="text"
            value={address.billing?.address}
            onChange={(e) =>
              setAddress({
                ...address,
                billing: { ...address.billing, address: e.target.value },
              })
            }
          />
        </div>
      </form>
      <p>Adresse de livraison</p>
      <form className="addressForm">
        <div className="addressFormFieldContainer">
          <p>Nom*</p>
          <input
            className="addressFormField"
            type="text"
            value={address.delivery?.lastname}
            onChange={(e) => {
              setAddress({
                ...address,
                delivery: { ...address.delivery, lastname: e.target.value },
              });
            }}
          />
        </div>
        <div className="addressFormFieldContainer">
          <p>Prénom*</p>
          <input
            className="addressFormField"
            type="text"
            value={address.delivery?.firstname}
            onChange={(e) =>
              setAddress({
                ...address,
                delivery: { ...address.delivery, firstname: e.target.value },
              })
            }
          />
        </div>
        <div className="addressFormFieldContainer">
          <p>Adresse*</p>
          <input
            className="addressFormFieldAddress"
            type="text"
            value={address.delivery?.address}
            onChange={(e) =>
              setAddress({
                ...address,
                delivery: { ...address.delivery, address: e.target.value },
              })
            }
          />
        </div>
      </form>
    </div>
  );
}
