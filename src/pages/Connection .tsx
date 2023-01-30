import React, { useState } from "react";
import "../assets/CSS/connection.css";
import { Login } from "../components/connection/Login";
import  Signup  from "../components/connection/Signup";

export function Connection() {
  const [view, setView] = useState(false); // true = login, false = signup

  return (
    <div className="connectionContainer">
      <div className="connectionContainContainer">
        <div className="connectionButtonsContainer">
          <button
            onClick={() => setView(true)}
            className={view ? "connectionButtonsOn" : "connectionButtonsOff"}
          >
            Se Connecter
          </button>
          <button
            onClick={() => setView(false)}
            className={view ? "connectionButtonsOff" : "connectionButtonsOn"}
          >
            S'inscrire
          </button>
        </div>
        {view ? <Login /> : <Signup />}
      </div>
    </div>
  );
}
