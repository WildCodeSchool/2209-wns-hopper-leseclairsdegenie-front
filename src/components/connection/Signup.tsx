import React, { useState } from "react";
import "../assets/CSS/signup.css";
import { useMutation } from "@apollo/client";
import { createUser } from "../../graphql/createUser";
import { Notification } from "./Notification";
import eye from "../assets/images/oeil.png";
import indexTexts from "../../assets/indexTexts.json";

 function Signup() {
  const [notification, setNotification] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const createdDate = new Date();

  const [doSignupMutation, { data, loading, error }] = useMutation(createUser);
  console.log(notification);
  console.log(data);
  console.log(loading);
  console.log(error);

  async function doSignup(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      await doSignupMutation({
        variables: {
          data: {
            email,
            password,
            firstname,
            lastname,
            createdDate,
          },
        },
      }).then(() => {
        setNotification(true);
      });
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
    } catch {}
  }

  return (
    <div className="signupContainer">
      {notification && (
        <Notification
          message={indexTexts.signupNotificationMessage}
          textButton={indexTexts.signupNotificationTextButton}
          icon="succes"
          type="validation"
          onValidate={() => window.location.reload()}
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
export default Signup;