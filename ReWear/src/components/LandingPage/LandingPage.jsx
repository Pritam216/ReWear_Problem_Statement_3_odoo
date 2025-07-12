// src/components/LandingPage/LandingPage.jsx

import React from "react";
import "./LandingPage.css";
import LandingHeader from "./LandingHeader";
import HeroImages from "./HeroImages";
import CategoriesSection from "./CategoriesSection";
import ProductListingsSection from "./ProductListingsSection";

import { useProjectDataState } from "../components/context/ProjectDataContext";

const categories = [
  { id: "cat1", name: "Electronics" },
  { id: "cat2", name: "Clothing" },
  { id: "cat3", name: "Home Goods" },
  { id: "cat4", name: "Books" },
  { id: "cat5", name: "Furniture" },
  { id: "cat6", name: "Art" },
];

const LandingPage = () => {
  const { listings } = useProjectDataState();

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
      <ProductListingsSection products={listings} />
      <footer className="landing-footer">
        <p>&copy; {new Date().getFullYear()} Rewear. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
