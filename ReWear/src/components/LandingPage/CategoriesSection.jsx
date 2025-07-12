import React from "react";
import "./CategoriesSection.css";

const CategoriesSection = ({ categories }) => (
  <section className="categories-section">
    <h2 className="section-title">Explore Categories</h2>
    <div className="categories-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          {category.name}
        </div>
      ))}
    </div>
  </section>
);

export default CategoriesSection;
