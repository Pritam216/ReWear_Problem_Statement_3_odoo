import React, { useState } from "react";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="auth-modal-tabs">
          <button
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "signup" ? "active" : ""}
            onClick={() => setTab("signup")}
          >
            Sign Up
          </button>
        </div>
        {tab === "login" ? (
          <form className="auth-form">
            <h2>Login</h2>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Login</button>
          </form>
        ) : (
          <form className="auth-form">
            <h2>Sign Up</h2>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit">Sign Up</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
