import React from "react";
import "../connection/login.css";

export function Cart({
  onValidateCart,
}: {
  onValidateCart: Function;
}): JSX.Element {
  return (
    <div className="addressContainer">
      <p>Cart</p>
      <button
        className="addressFormFieldAddress"
        type="button"
        onClick={() => {
          onValidateCart();
        }}
      >
        VALIDER PANIER
      </button>
    </div>
  );
}
