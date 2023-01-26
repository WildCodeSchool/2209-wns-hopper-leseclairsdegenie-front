import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { createUser } from "../graphql/createUser";
import eye from "../assets/oeil.png";

export default function Signup() {
  const [notification, setNotification] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const createdDate = new Date();
  console.log(createdDate);

  const [doSignupMutation, { data, loading, error }] = useMutation(createUser);

  async function doSignup() {
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
      }).then(() => {});
      setEmail("");
      setPassword("");
    } catch {}
  }

  return (
    <div>
      {error && (
        <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
      )}
      <form onSubmit={doSignup}>
        <p>NOM*</p>
        <input
          disabled={loading}
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <p>Prénom*</p>
        <input
          disabled={loading}
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <p>Email*</p>
        <input
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password*</p>
        <div>
          <input
            disabled={loading}
            type={seePassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <img
            onMouseEnter={() => setSeePassword(true)}
            onMouseLeave={() => setSeePassword(false)}
            src={eye}
            alt="eye"
          />
        </div>
        <input type="submit" disabled={loading} value="Envoyer" />
      </form>
    </div>
  );
}
// export default Signup();

// function Signup() {
//     throw new Error("Function not implemented.");
// }
