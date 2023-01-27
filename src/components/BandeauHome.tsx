import React from "react";
import ski from "../assets/ski.jpg";
import plongee from "../assets/plongee.jpg";
import randonnee from "../assets/randonnee.jpg";
import escalade from "../assets/escalade.jpg";
import cyclisme from "../assets/cyclisme.jpg";
import musculation from "../assets/musculation.jpg";
import styles from "./BandeauHome.module.css";

const BandeauHome = () => {
  return (
    <div className={styles.containerBandeau}>
      <div className={styles.containerImage}>
        <img src={ski} alt="skieur" />
        <img src={randonnee} alt="randonneur" />
        <img src={plongee} alt="plongeur" />
        <img src={musculation} alt="alterre" />
        <img src={escalade} alt="escalade" />
        <img src={cyclisme} alt="cycliste" />
      </div>
      <p>Louer votre matériel de sport, c'est aussi ça l'esprit d'équipe.</p>
    </div>
  );
};

export default BandeauHome;
