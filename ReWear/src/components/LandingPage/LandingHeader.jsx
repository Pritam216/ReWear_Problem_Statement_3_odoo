import React from "react";
import "./LandingHeader.css";
import SearchBar from "./SearchBar";

const LandingHeader = () => (
  <header className="landing-header">
    <div className="logo">Rewear</div>
    <SearchBar />
    <div className="user-profile-icon">
      <i className="fas fa-user-circle"></i>
    </div>
  </header>
);

export default LandingHeader;
