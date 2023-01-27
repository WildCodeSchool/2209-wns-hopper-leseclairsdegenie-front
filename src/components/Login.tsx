import React, { useState } from "react";
import "./login.css";
import { useMutation } from "@apollo/client";
import { createUser } from "../graphql/createUser";
import { Notification } from "../components/Notification";
import indexTexts from "../assets/indexTexts.json";

export function Login() {
  const [notification, setNotification] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [doLoginMutation, { data, loading, error }] = useMutation(createUser);
  console.log(notification);
  console.log(data);
  console.log(loading);
  console.log(error);

  async function doLogin(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      await doLoginMutation({
        variables: {
          data: {
            email,
            password,
          },
        },
      }).then(() => {
        setNotification(true);
      });
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <div className="loginContainer">
      {notification && (
        <Notification
          message={indexTexts.signupNotificationMessage}
          textButton={indexTexts.signupNotificationTextButton}
          icon="succes"
          type="validation"
          onValidate={() => window.location.reload()}
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
        <input
          className="loginFormField"
          disabled={loading}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
              textOverflow: "ellipsis"
            }}
          >
            {JSON.stringify(error.message, null, 1)}
          </pre>
        )}
      </form>
    </div>
  );
}
