// src/components/LandingPage/LandingPage.jsx

import React from "react";
import "./LandingPage.css";
import LandingHeader from "./LandingHeader";
import HeroImages from "./HeroImages";
import CategoriesSection from "./CategoriesSection";
import ProductListingsSection from "./ProductListingsSection";

const LandingPage = () => {
  // Dummy data for categories and products to visualize the layout
  const categories = [
    { id: "cat1", name: "Electronics" },
    { id: "cat2", name: "Clothing" },
    { id: "cat3", name: "Home Goods" },
    { id: "cat4", name: "Books" },
    { id: "cat5", name: "Furniture" },
    { id: "cat6", name: "Art" },
  ];

  const products = [
    {
      id: "prod1",
      title: "Smart Watch",
      description: "Latest model",
      image: "https://via.placeholder.com/300x200/DDEEFF/333333?text=Product+1",
    },
    {
      id: "prod2",
      title: "Summer Dress",
      description: "Light & breezy",
      image: "https://via.placeholder.com/300x200/EEDDFF/333333?text=Product+2",
    },
    {
      id: "prod3",
      title: "Coffee Maker",
      description: "Brew perfect coffee",
      image: "https://via.placeholder.com/300x200/FFEEDD/333333?text=Product+3",
    },
    {
      id: "prod4",
      title: "Fantasy Novel",
      description: "Epic adventure",
      image: "https://via.placeholder.com/300x200/FFDDFF/333333?text=Product+4",
    },
    {
      id: "prod5",
      title: "Vintage Lamp",
      description: "Unique decor",
      image: "https://via.placeholder.com/300x200/DDFFEE/333333?text=Product+5",
    },
    {
      id: "prod6",
      title: "Painting",
      description: "Abstract art",
      image: "https://via.placeholder.com/300x200/EEFFDD/333333?text=Product+6",
    },
  ];

  return (
    <div className="landing-page">
      <LandingHeader />
      <section className="hero-section">
        <h2 className="hero-title">Discover Unique Swaps</h2>
        <p className="hero-subtitle">
          Find new-to-you treasures and give your items a second life.
        </p>
        <HeroImages />
      </section>
      <CategoriesSection categories={categories} />
      <ProductListingsSection products={products} />
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Rewear. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
