import React from "react";
import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Signup from "./components/Signup";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { Connection } from "./pages/Connection ";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


function Main() {
  return (
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
          <Route path="signup" element={<Signup />} />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

const client = new ApolloClient({
  uri: "http://localhost:5000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Main />
      <Home />
      <Connection />

    </ApolloProvider>
  );
}

export default App;
