import React, { useState } from "react";
import ski from "../assets/images/ski.jpg";
import "./basketCard.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IData } from "../pages/Basket";

export interface IDataProps {
  data: IData[] | null;
}

const BasketCard = (props: IData) => {
  console.log(props);
  const [quantity, setQuantity] = useState(props.data.quantity);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity - 1 > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="BasketCard">
      <div className="check">
        <input type="checkbox" id="topping" name="topping" value="Paneer" />
      </div>
      <div className="image">
        <img src={ski} alt="ski" />
      </div>
      {props.data.taille && (
        <div className="taille">
          <p>Taille : {props.data.taille}</p>
        </div>
      )}

      <div className="duree">
        <p>Durée : {props.data.duree} jours</p>
      </div>
      <div className="prix">
        <p>Prix : {props.data.price},00 €‎</p>
      </div>
      <div className="quantite">
        <div>
          <button
            className="btn-quantity"
            onClick={() => {
              incrementQuantity();
            }}
          >
            +
          </button>
        </div>
        <div>
          <p>{quantity}</p>
        </div>
        <div>
          <button
            className="btn-quantity"
            onClick={() => {
              decrementQuantity();
            }}
          >
            −
          </button>
        </div>
      </div>
      <div className="supprimer">
        <button onClick={() => {}}>
          <RiDeleteBin5Fill className="svg-delete" />
        </button>
      </div>
    </div>
  );
};

export default BasketCard;
