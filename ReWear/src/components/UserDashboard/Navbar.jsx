import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">ReWear</div>
      <div className="settings-menu" ref={menuRef}>
        <button className="settings-btn" onClick={toggleDropdown}>
          ⚙
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdown-item">Theme</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
