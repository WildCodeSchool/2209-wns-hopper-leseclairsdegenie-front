import React, { useState } from "react";
import "./login.css";
import { useMutation } from "@apollo/client";
import { signin } from "../../graphql/connection";
import { Notification } from "../Notification";
import indexTexts from "../../assets/indexTexts.json";
import eye from "../../assets/images/oeil.png";
import { IConnection } from "../../interfaces";
import { useNavigate } from "react-router-dom";

export function Login({ onTokenChange }: IConnection): JSX.Element {
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doLoginMutation, { loading, error }] = useMutation(signin);

  async function doLogin(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      const { data } = await doLoginMutation({
        variables: {
          email,
          password,
        },
      });
      // data.signin = "uijbsdgbsdogjuvb";
      if (data.signin) {
        onTokenChange(data.signin);
        setNotification(true);
      } else {
        setEmail("");
        setPassword("");
      }
    } catch {}
  }

  return (
    <div className="loginContainer">
      {notification && (
        <Notification
          message={indexTexts.loginNotificationMessage}
          textButton={indexTexts.loginNotificationTextButton}
          icon="succes"
          type="validation"
          onValidate={() => navigate("/")}
        />
      )}
      <form onSubmit={doLogin} className="loginForm">
        <p>E-mail*</p>
        <input
          className="loginFormField"
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Mot de passe*</p>
        <div className="loginFormPasswordContainer">
          <input
            className="loginFormField"
            disabled={loading}
            type={seePassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            className="loginFormEyeIcon"
            onMouseEnter={() => setSeePassword(true)}
            onMouseLeave={() => setSeePassword(false)}
            src={eye}
            alt="eye"
          />
        </div>
        <div className="loginFormSubmitContainer">
          <input
            className="loginFormSubmit"
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
