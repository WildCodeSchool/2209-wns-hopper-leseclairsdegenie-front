/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import "./connection.css";
import { Login } from "../components/connection/Login";
import { Signup } from "../components/connection/Signup";
import { MainContext } from "../MainContexts";

export function Connection() {
  const Main = useContext(MainContext);
  const [view, setView] = useState(false); // true = login, false = signup
  

  function onTokenChange(token: string) {
    if (token) {
      localStorage.setItem("token", token);
      Main?.refetch();
    }
  }

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
        {view ? (
          <Login onTokenChange={onTokenChange} />
        ) : (
          <Signup onTokenChange={onTokenChange} />
        )}
      </div>
    </div>
  );
}
