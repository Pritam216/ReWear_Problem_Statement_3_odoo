import React from "react";
import "./ProductListingsSection.css";

const ProductListingsSection = ({ products }) => (
  <section className="product-listings-section">
    <h2 className="section-title">Popular Listings</h2>
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card-landing">
          <img
            src={product.image}
            alt={product.title}
            className="product-card-image"
          />
          <h3 className="product-card-title">{product.title}</h3>
          <p className="product-card-description">{product.description}</p>
          <button className="product-card-button">View Details</button>
        </div>
      ))}
    </div>
  </section>
);

export default ProductListingsSection;
