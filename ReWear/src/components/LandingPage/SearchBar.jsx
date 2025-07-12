import React from "react";
import "./SearchBar.css";

const SearchBar = () => (
  <div className="search-bar-container">
    <input
      type="text"
      placeholder="Search products..."
      className="search-input"
    />
    <button className="search-button">
      <i className="fas fa-search"></i>
    </button>
  </div>
);

export default SearchBar;
