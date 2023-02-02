import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Basket from "./pages/Basket";
import { Connection } from "./pages/Connection ";
import { MainProvider } from "./MainContexts";
import { PurchaseProces } from "./pages/PurchaseProces";

function Main() {
  return (
    <MainProvider>
      <Router>
        <div>
          <Navbar />
          {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/categorie/:name" element={<Category />} />
            {/* <Route path="reservations" element={<Reservations />} />
          <Route path="cart" element={<Cart />} /> */}
            <Route path="basket" element={<Basket />} />
            <Route path="connection" element={<Connection />} />
            <Route path="purchaseProces" element={<PurchaseProces />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </MainProvider>
  );
}
const httpLink = createHttpLink({
  uri: "http://localhost:5000",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
    </ApolloProvider>
  );
}

export default App;
