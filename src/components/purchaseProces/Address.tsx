import React, { useContext, useEffect } from "react";
import "./address.css";
import { IAddressComponent } from "../../interfaces";
import { MainContext } from "../../MainContexts";

export function Address({
  address,
  setAddress,
}: IAddressComponent): JSX.Element {
  const Main = useContext(MainContext);
  useEffect(() => {
    const start = async () => {
      await Main?.refetch();
      if (Main?.user) {
        setAddress({
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
      }
    };
    start();
  }, []);
  return (
    <div className="addressContainer">
      <div className="addressFormContainer">
        <p className="addressFormTitle">Adresse de facturation</p>
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
            <textarea
              className="addressFormFieldAddress"
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
        <p className="addressFormTitle">Adresse de livraison</p>
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
            <textarea
              className="addressFormFieldAddress"
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
    </div>
  );
}
