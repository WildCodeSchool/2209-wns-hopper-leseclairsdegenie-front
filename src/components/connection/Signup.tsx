import React, { useState } from "react";
import "./signup.css";
import { useMutation } from "@apollo/client";
import { Notification } from "../Notification";
import eye from "../../assets/images/oeil.png";
import indexTexts from "../../assets/indexTexts.json";
import { IConnection } from "../../interfaces";
import { createUser } from "../../graphql/connection";
import { useNavigate } from "react-router-dom";

export function Signup({ onTokenChange }: IConnection): JSX.Element {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const [doSignupMutation, { loading, error }] = useMutation(createUser);

  async function doSignup(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      const { data } = await doSignupMutation({
        variables: {
          data: {
            email,
            password,
            firstname,
            lastname,
          },
        },
      });
      if (data.createUser) {
        onTokenChange(data.createUser);
        setNotification(true);
      } else {
        setEmail("");
        setPassword("");
        setFirstname("");
        setLastname("");
      }
    } catch {
      console.log("errorr rr r");
    }
  }

  return (
    <div className="signupContainer">
      {notification && (
        <Notification
          message={indexTexts.signupNotificationMessage}
          textButton={indexTexts.signupNotificationTextButton}
          icon="succes"
          type="validation"
          onValidate={() => navigate("/")}
        />
      )}
      <form onSubmit={doSignup} className="signupForm">
        <p>Nom*</p>
        <input
          className="signupFormField"
          disabled={loading}
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <p>Prénom*</p>
        <input
          className="signupFormField"
          disabled={loading}
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <p>E-mail*</p>
        <input
          className="signupFormField"
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Mot de passe*</p>
        <div className="signupFormPasswordContainer">
          <input
            className="signupFormField"
            disabled={loading}
            type={seePassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className="signupFormEyeIcon"
            onMouseEnter={() => setSeePassword(true)}
            onMouseLeave={() => setSeePassword(false)}
            src={eye}
            alt="eye"
          />
        </div>
        <div className="signupFormSubmitContainer">
          <input
            className="signupFormSubmit"
            type="submit"
            disabled={loading}
            value="Envoyer"
          />
        </div>
        {error && (
          <pre
            style={{
              color: "red",
              width: "32ch",
              overflow: "hidden",
              textAlign: "center",
              position: "relative",
              margin: "0",
              textOverflow: "ellipsis",
            }}
          >
            {JSON.stringify(error.message, null, 1)}
          </pre>
        )}
      </form>
    </div>
  );
}
