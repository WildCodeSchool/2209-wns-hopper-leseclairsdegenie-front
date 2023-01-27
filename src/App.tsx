import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Signup } from "./Pages/signup";
import Products from "./Pages/Products";
import Home from "./pages/Home";
import Category from "./pages/Category";

function Main() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            {/* <li>
              <Link to="/">Home</Link>
            </li> */}
            <li>
              <Link to="products">Produits</Link>
            </li>
            {/* <li>
              <Link to="reservations">Réservations</Link>
            </li> */}
            {/* <li>
              <Link to="cart">Panier</Link>
            </li> */}
            <li>
              <Link to="signup">Connexion</Link>
            </li>
          </ul>
        </nav>

        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="products" element={<Products />} />
          <Route path="/categorie/:name" element={<Category />} />
          {/* <Route path="reservations" element={<Reservations />} /> */}
          {/* <Route path="cart" element={<Cart />} /> */}
          <Route path="signup" element={<Signup />} />
        </Routes>
      </div>
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
    </ApolloProvider>
  );
}

export default App;
