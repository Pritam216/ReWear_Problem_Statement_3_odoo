// src/components/UserListingsGrid.jsx
import React, { useState, useEffect } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "./UserListingsGrid.css"; // Ensure you have this CSS file
// Import the custom hooks from your ProjectDataContext
import {
  useProjectDataState,
  useProjectDataDispatch,
} from "../context/ProjectDataContext.jsx";

// --- ItemCard Component (Helper for rendering each item) ---
const ItemCard = ({ item, onClick, tabIndex, itemId }) => {
  if (item.type === "add-new") {
    return (
      <div
        className="item-card add-new"
        onClick={onClick}
        tabIndex={tabIndex}
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
        onClick={() => onClick(item.id)} // Pass item.id for detailed view
        tabIndex={tabIndex}
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
          <p className="item-description">
            {item.smallDescription || "No description provided."}
          </p>
          <p className="item-meta">Uploaded: {item.uploaded || "N/A"}</p>
        </div>
      </div>
    );
  }
};

// --- UserListingsGrid Main Component ---
const UserListingsGrid = ({ onProductClick }) => {
  const [showModal, setShowModal] = useState(false);

  // Access state and dispatch from context
  console.log("UserListingsGrid: Re-rendering..."); // Log on every re-render
  const { listings } = useProjectDataState();
  const dispatch = useProjectDataDispatch();
  console.log(
    "UserListingsGrid: State listings count (from context):",
    listings.length
  ); // Log the listings count

  // State for the new item form
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    smallDescription: "",
    image: "", // Stores the image URL string
    status: "Available",
    uploaded: new Date().toISOString().split("T")[0], // Sets current date
  });

  // Modal handlers
  const handleOpenModal = () => {
    console.log("UserListingsGrid: Opening modal.");
    setShowModal(true);
  };
  const handleCloseModal = () => {
    console.log("UserListingsGrid: Closing modal, resetting newItem state.");
    setNewItem({
      title: "",
      description: "",
      smallDescription: "",
      image: "",
      status: "Available",
      uploaded: new Date().toISOString().split("T")[0],
    });
    // Manually clear the file input value for a better UX
    const fileInput = document.querySelector(".hidden-file-input");
    if (fileInput) {
      fileInput.value = "";
    }
    setShowModal(false);
  };

  // Form input change handler
  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
    console.log("UserListingsGrid: newItem state updated:", {
      [e.target.name]: e.target.value,
    });
  };

  // Image file selection handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file); // Create a temporary URL for preview
      setNewItem((prevItem) => ({ ...prevItem, image: imageURL }));
      console.log("UserListingsGrid: Image selected, URL:", imageURL);
    } else {
      setNewItem((prevItem) => ({ ...prevItem, image: "" }));
      console.log("UserListingsGrid: Image cleared.");
    }
  };

  // Handle adding a new item
  const handleAddItem = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log("UserListingsGrid: handleAddItem triggered.");
    console.log("UserListingsGrid: newItem before validation:", newItem);

    // Basic validation
    if (!newItem.title || !newItem.image || !newItem.smallDescription) {
      alert(
        "Please fill in all required fields (Title, Short Description, and Image)."
      );
      console.log("UserListingsGrid: Validation FAILED.");
      return; // Stop if validation fails
    }
    console.log("UserListingsGrid: Validation PASSED.");

    // Generate a unique ID for the new item
    const newId = `listing-${Date.now()}`;
    console.log("UserListingsGrid: Dispatching ADD_LISTING with new item:", {
      ...newItem,
      id: newId,
    });
    // Dispatch the ADD_LISTING action to update the global state
    dispatch({ type: "ADD_LISTING", payload: { ...newItem, id: newId } });
    handleCloseModal(); // Close modal and reset form
  };

  // Prepare items for display in the ScrollMenu
  // Always include the "Add Item" card first
  const itemsToDisplay = [
    { type: "add-new", id: "add-new-card" }, // Static ID for the Add button
    ...listings.map((item) => ({
      ...item,
      // Ensure every listing has a stable unique ID for React's key prop
      id:
        item.id ||
        `listing-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    })),
  ];

  // Effect to log itemsToDisplay whenever the listings state changes
  useEffect(() => {
    console.log(
      "UserListingsGrid: useEffect - Current listings state has changed. Displaying items:"
    );
    console.log(itemsToDisplay);
  }, [listings]); // Rerun when `listings` from context changes

  // Click handler for items in the scroll menu
  const onItemClick = (itemId) => {
    if (itemId === "add-new-card") {
      handleOpenModal();
    } else {
      // If it's a regular listing, call the parent's onProductClick prop
      if (onProductClick) {
        onProductClick(itemId);
      }
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
        {/* ScrollMenu component from react-horizontal-scrolling-menu */}
        <ScrollMenu>
          {itemsToDisplay.map((item) => (
            <ItemCard
              key={item.id} // Essential for React list rendering performance and correctness
              itemId={item.id} // Prop to ItemCard
              item={item}
              onClick={item.type === "add-new" ? handleOpenModal : onItemClick}
              tabIndex={0}
            />
          ))}
        </ScrollMenu>
      </div>

      {/* Modal for adding a new listing */}
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
              <textarea
                name="smallDescription"
                placeholder="Short Description (for display)"
                value={newItem.smallDescription}
                onChange={handleChange}
                required
                rows="3"
              />
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
