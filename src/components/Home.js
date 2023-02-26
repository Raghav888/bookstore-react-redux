import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Filterbox } from "./filterBox/FilterBox";
import { Product } from "./product/Product";
import { Navbar } from "./shared/Navbar";
import { Footer } from "./shared/Footer";
import "./home.css";

const Home = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="product-list-head">
      <Navbar />
      <div className="main-box">
        <Filterbox />
        <Product />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
