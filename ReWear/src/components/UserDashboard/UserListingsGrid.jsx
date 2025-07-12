import React from "react";
import "./UserListingsGrid.css";

const UserListingsGrid = ({ listings }) => {
  return (
    <div className="listings-section">
      <div className="listings-header">
        <h2 className="listings-title">📦 My Listings</h2>
        <p className="listings-subtitle">
          Items you've shared with the community
        </p>
      </div>

      <div className="item-grid">
        {listings.map((item, index) => (
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
              <p className="item-meta">Uploaded: {item.uploaded || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListingsGrid;
