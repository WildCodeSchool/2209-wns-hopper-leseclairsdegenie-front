import React from "react";
import BandeauHome from "../components/BandeauHome";
import CategoryHome from "../components/CategoryHome";
import Footer from "../components/footer/Footer";

const Home = () => {
  return (
    <div>
      <BandeauHome />
      <CategoryHome />
      <Footer />
    </div>
  );
};

export default Home;
