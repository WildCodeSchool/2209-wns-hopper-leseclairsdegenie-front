import React from "react";
import "./style.css";
import ski from "../../assets/images/ski.png";
import hiking from "../../assets/images/hiking.png";
import diver from "../../assets/images/diver.png";
import climbing from "../../assets/images/climbing.png";
import cyclists from "../../assets/images/cyclists.png";
import musculation from "../../assets/images/musculation.png";

interface Props {
  style: any;
}

const BandeauHome = ({ style }: Props): JSX.Element => {
  return (
    <div>
      <div className="component" style={style}>
        <div className="overlap">
          <img className="hiking" alt="Hiking" src={hiking} />
          <img className="diver" alt="Diver" src={diver} />
        </div>
        <div className="overlap-group">
          <img className="ski" alt="Ski" src={ski} />
          <img className="climbing" alt="Climbing" src={climbing} />
        </div>
        <div className="div">
          <img className="cyclists" alt="Cyclists" src={cyclists} />
          <img className="musculation" alt="Musculation" src={musculation} />
        </div>
      </div>
      <p>Louer votre matériel de sport, c'est aussi ça l'esprit d'équipe.</p>
    </div>
  );
};

export default BandeauHome;
