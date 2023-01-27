import React from "react";
import ski from "../assets/images/ski.jpg";
import plongee from "../assets/images/plongee.jpg";
import randonnee from "../assets/images/randonnee.jpg";
import escalade from "../assets/images/escalade.jpg";
import cyclisme from "../assets/images/cyclisme.jpg";
import musculation from "../assets/images/musculation.jpg";
import styles from "../assets/CSS/BandeauHome.module.css";

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
