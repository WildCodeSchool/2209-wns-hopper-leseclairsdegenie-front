import React from "react";
import ski from "../../assets/images/ski.jpg";
import plongee from "../../assets/images/plongee.jpg";
import randonnee from "../../assets/images/randonnee.jpg";
import escalade from "../../assets/images/escalade.jpg";
import cyclisme from "../../assets/images/cyclisme.jpg";
import musculation from "../../assets/images/musculation.jpg";
import styles from "./BandeauHome.module.css";
import bandeau from "../../assets/images/Component61.jpg";

const BandeauHome = () => {
  return (
    <div className={styles.containerBandeau}>
      <img src={bandeau} useMap="#image-map" />
      <map name="image-map">
        <area target="" alt="title" title="title" href="http://localhost:3000/products" coords="41,50,34" shape="circle" />
        <area target="" alt="" title="" href="http://localhost:3000/products" coords="435,392,31" shape="circle" />
        <area target="" alt="" title="" href="http://localhost:3000/products" coords="525,46,28" shape="circle" />
        <area target="" alt="" title="" href="http://localhost:3000/products" coords="916,394,34" shape="circle" />
        <area target="" alt="" title="" href="http://localhost:3000/products" coords="1010,46,32" shape="circle" />
        <area target="" alt="" title="" href="http://localhost:3000/products" coords="1411,391,33" shape="circle" />
      </map>
      <p>Louer votre matériel de sport, c'est aussi ça l'esprit d'équipe.</p>
    </div>
  );
};

export default BandeauHome;
