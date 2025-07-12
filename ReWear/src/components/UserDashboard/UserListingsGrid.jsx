import React, { useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./UserListingsGrid.css";

const ItemCard = ({ item, onClick, tabIndex, id, isVisible }) => {
  if (item.type === "add-new") {
    return (
      <div
        className="item-card add-new"
        onClick={onClick}
        tabIndex={tabIndex}
        key={id}
        role="button"
      >
        <div className="plus-icon">＋</div>
        <p>Add Item</p>
      </div>
    );
  } else {
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
          {/* Display smallDescription here */}
          <p className="item-description">
            {item.smallDescription || "No description provided."}
          </p>
          <p className="item-meta">Uploaded: {item.uploaded || "N/A"}</p>
        </div>
      </div>
    );
  }
};

const UserListingsGrid = ({ initialListings }) => {
  const [showModal, setShowModal] = useState(false);
  const [listings, setListings] = useState(initialListings || []);

  const [newItem, setNewItem] = useState({
    title: "",
    description: "", // Keep for backend/future detailed view
    smallDescription: "", // New field for frontend display
    image: "",
    status: "Available",
    uploaded: new Date().toISOString().split("T")[0],
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setNewItem({
      title: "",
      description: "",
      smallDescription: "", // Reset new field too
      image: "",
      status: "Available",
      uploaded: new Date().toISOString().split("T")[0],
    });
    setShowModal(false);
  };

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setNewItem({ ...newItem, image: imageURL });
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (newItem.title && newItem.image && newItem.smallDescription) {
      // Ensure smallDescription is also required
      setListings((prevListings) => [newItem, ...prevListings]);
    }
    handleCloseModal();
  };

  const itemsToDisplay = [
    { type: "add-new", id: "add-new-card" },
    ...listings.map((item, idx) => ({ ...item, id: `listing-${idx}` })),
  ];

  const onItemClick = (itemId) => {
    if (itemId === "add-new-card") {
      handleOpenModal();
    }
  };

  return (
    <div className="listings-section">
      <div className="listings-header">
        <h2 className="listings-title">📦 My Listings</h2>
        <p className="listings-subtitle">
          Items you've shared with the community
        </p>
      </div>

      <div className="horizontal-scroll-container">
        <ScrollMenu>
          {itemsToDisplay.map((item) => (
            <ItemCard
              itemId={item.id}
              key={item.id}
              item={item}
              onClick={() => onItemClick(item.id)}
              tabIndex={0}
            />
          ))}
        </ScrollMenu>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Add New Listing</h3>
            <form onSubmit={handleAddItem}>
              <input
                name="title"
                placeholder="Item Title"
                value={newItem.title}
                onChange={handleChange}
                required
              />
              {/* Input for smallDescription */}
              <textarea
                name="smallDescription"
                placeholder="Short Description (for display)"
                value={newItem.smallDescription}
                onChange={handleChange}
                required
                rows="3" // Give it a bit more height than a single line input
              />
              {/* Keep original description field hidden or for future use */}
              <textarea
                name="description"
                placeholder="Full Description"
                value={newItem.description}
                onChange={handleChange}

              />
              <label className="file-input-label">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required
                  className="hidden-file-input"
                />
              </label>
              {newItem.image && (
                <div className="image-preview">
                  <img src={newItem.image} alt="Preview" />
                </div>
              )}
              <select
                name="status"
                value={newItem.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Swapped">Swapped</option>
              </select>
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListingsGrid;
