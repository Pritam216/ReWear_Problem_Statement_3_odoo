import React from "react";
import "./ProductListingsSection.css";
import ProductSlider from "./ProductSlider";

const ProductListingsSection = ({ products }) => (
  <section className="product-listings-section">
    <h2 className="section-title">Popular Listings</h2>
    <ProductSlider products={products} />
  </section>
);

export default ProductListingsSection;
