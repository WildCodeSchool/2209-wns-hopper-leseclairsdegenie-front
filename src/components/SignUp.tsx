import { useMutation } from "@apollo/client";
import { useState } from "react";
import { createUser } from "../graphql/createUser";



export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  
    const [doSignupMutation, { data, loading, error }] = useMutation(createUser);
  
    async function doSignup() {
      try {
        await doSignupMutation({
          variables: {
            data: {
              email,
              password,
            },
          },
        });
        setEmail("");
        setPassword("");
      } catch {}
    }
  
    return (
      <>
        {error && (
          <pre style={{ color: "red" }}>{JSON.stringify(error, null, 4)}</pre>
        )}
        <p>Email:</p>
        <input
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p>Password:</p>
        <input
          disabled={loading}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={loading} onClick={doSignup}>
          Signup
        </button>
      </>
    );
  }