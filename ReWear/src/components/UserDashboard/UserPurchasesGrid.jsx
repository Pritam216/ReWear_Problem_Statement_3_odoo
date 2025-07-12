import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./UserPurchasesGrid.css";

const PurchaseItemCard = ({ item, onClick, tabIndex, id, isVisible }) => {
  return (
    <div
      className="item-card"
      onClick={onClick}
      tabIndex={tabIndex}
      key={id}
      role="group"
    >
      <div className="item-img-wrapper">
        <img src={item.image} alt={item.title} className="item-img" />
        <span className={`item-status-badge ${item.status.toLowerCase()}`}>
          {item.status}
        </span>
      </div>
      <div className="item-content">
        <h4 className="item-title">{item.title}</h4>
        <p className="item-meta">Swapped on: {item.uploaded || "N/A"}</p>
      </div>
    </div>
  );
};

const UserPurchasesGrid = ({ purchases }) => {
  const itemsToDisplay = purchases.map((item, idx) => ({
    ...item,
    id: `purchase-${idx}`,
  }));

  const onItemClick = (itemId) => {
    console.log("Clicked purchase item:", itemId);
  };

  return (
    <div className="purchases-section">
      <h3 className="section-heading">🛍️ My Purchases & Swaps</h3>
      <div className="horizontal-scroll-container">
        <ScrollMenu>
          {itemsToDisplay.map((item) => (
            <PurchaseItemCard
              itemId={item.id}
              key={item.id}
              item={item}
              onClick={() => onItemClick(item.id)}
              tabIndex={0}
            />
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default UserPurchasesGrid;
