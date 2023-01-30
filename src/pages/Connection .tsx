/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./connection.css";
import { Login } from "../components/Login";
import { Signup } from "../components/Signup";
import { useQuery } from "@apollo/client";
import { me } from "../graphql/connection";
import { MainContext } from "../MainContexts";

export function Connection() {
  const Main = useContext(MainContext);
  const [view, setView] = useState(false); // true = login, false = signup
  const { data, refetch, error } = useQuery(me, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      Main?.setUser(null);
      console.log("Not user connected");
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      if (data.me) {
        Main?.setUser(data.me);
        console.log("User connected");
      }
    }
  }, [data]);

  function onTokenChange(token?: string) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    Main?.setUser(undefined);
    refetch();
  }
  console.log("The user is : " + Main);

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
