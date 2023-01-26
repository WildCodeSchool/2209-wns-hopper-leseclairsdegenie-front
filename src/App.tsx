import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Signup from "./Pages/signup";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";

// function Main() {
//   return (
//     <div>
//       <Signup />
//     </div>
//   );
// }

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client} >
      <Navbar />
      <Signup />
      <Footer />
    </ApolloProvider>
  );
}

export default App;
