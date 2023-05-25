import React, { useState } from "react";
import "./resumeCommande.css";
import { IResevations } from "../../interfaces";
import ReservationCard from "./ReservationCard";

const ResumeCommande = (props: {
  data: IResevations[];
  totale?: number | null;
}) => {
  const [resume, setResume] = useState(props.data);
  console.log("page adresse : ", resume);
  return (
    <div className="recapCommande">
      <h3>Résumé de la Commande</h3>
      <div className="resumeScroller">
        {resume &&
          resume.map((resa) => {
            return <ReservationCard data={resa} />;
          })}
      </div>
      <div className="priceCommande">
        {props.totale && <h3>Totale : {props.totale}€ </h3>}
      </div>
    </div>
  );
};

export default ResumeCommande;
