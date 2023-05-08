import React from "react";
import "./ReservationCard.css";
import { IResevations } from "../../interfaces";
//import { format } from "date-fns";
const ReservationCard = (props: { data: IResevations }) => {
  const reservation = props.data;
  const dateStart = new Date(reservation.startDate).toLocaleDateString();
  const dateEnd = new Date(reservation.endDate).toLocaleDateString();
  console.log("date ======> ", dateStart, dateEnd);
  return (
    <div className="recapReservation">
      <div className="ImageTitle">
        <img src={reservation.product.image} alt="la reservation" />
        <h3>{reservation.product.name}</h3>
      </div>
      <div className="Detail">
        {reservation.taille && <p>Taille : {reservation.taille}</p>}
        <p>Quantité : x{reservation.quantity}</p>
        <p>
          Date : {dateStart} - {dateEnd}
        </p>
        <p>Prix : {reservation.price}€/Jour</p>
        <hr className="trait" />
      </div>
    </div>
  );
};

export default ReservationCard;
