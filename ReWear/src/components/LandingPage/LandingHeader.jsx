import React, { useState } from "react";
import "./LandingHeader.css";
import SearchBar from "./SearchBar";
import AuthModal from "./AuthModal";
import "./LandingHeaderActions.css";

const LandingHeader = () => {
  const [showAuth, setShowAuth] = useState(false);
  return (
    <header className="landing-header">
      <div className="logo">Rewear</div>
      <SearchBar />
      <div className="landing-header-actions">
        <button className="login-btn" onClick={() => setShowAuth(true)}>
          Login / Sign Up
        </button>
        <div className="user-profile-icon">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </header>
  );
};

export default LandingHeader;
