import React from "react";
import "./UserPurchasesGrid.css";

const UserPurchasesGrid = ({ purchases }) => {
  return (
    <div className="purchases-section">
      <h3 className="section-heading">🛍️ My Purchases & Swaps</h3>
      <div className="item-grid">
        {purchases.map((item, index) => (
          <div key={index} className="item-card">
            <div className="item-img-wrapper">
              <img src={item.image} alt={item.title} className="item-img" />
              <span
                className={`item-status-badge ${item.status.toLowerCase()}`}
              >
                {item.status}
              </span>
            </div>
            <div className="item-content">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-meta">Swapped on: {item.uploaded || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPurchasesGrid;
