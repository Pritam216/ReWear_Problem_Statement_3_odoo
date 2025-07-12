// src/components/ProductDetailPage/ProductDetailPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";
import {
  useProjectDataState,
  useProjectDataDispatch,
} from "../context/ProjectDataContext.jsx";

// --- Helper Component for Customer Interest Item ---
// Extracted to improve readability in the main component and potentially reusability
const CustomerInterestItem = React.memo(({ interest, onAccept, onDecline }) => {
  return (
    <div key={interest.id} className="customer-item">
      <div className="customer-info">
        <p className="customer-name">{interest.customerName}</p>
        <p className="customer-message">"{interest.message}"</p>
      </div>
      <div className="customer-actions">
        {interest.status === "Pending" ? (
          <>
            <button
              className="accept-button"
              onClick={() => onAccept(interest.id)}
            >
              Accept
            </button>
            <button
              className="decline-button"
              onClick={() => onDecline(interest.id)}
            >
              Decline
            </button>
          </>
        ) : (
          <span
            className={`interest-status-label ${interest.status.toLowerCase()}`}
          >
            {interest.status}
          </span>
        )}
      </div>
    </div>
  );
});

// --- Main ProductDetailPage Component ---
const ProductDetailPage = () => {
  const { listings, customerInterests } = useProjectDataState();
  const dispatch = useProjectDataDispatch();
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);

  // Effect to find product and initialize form data when productId or listings change
  useEffect(() => {
    const foundProduct = listings.find((item) => item.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      setEditFormData({ ...foundProduct });
    } else {
      // If product not found, navigate back to the dashboard's root
      // Consider adding a state for "product not found" message if desired
      navigate("/myDashboard");
    }
  }, [productId, listings, navigate]);

  // Handle edit form field changes
  const handleEditFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({ ...prevData, [name]: value }));
  }, []); // No dependencies needed as prevData is used

  // Handle image file selection for edit form
  const handleEditImageChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setEditFormData((prevData) => ({ ...prevData, image: imageURL }));
    }
  }, []); // No dependencies needed

  // Handle saving edited product data
  const handleSaveEdit = useCallback(
    (e) => {
      e.preventDefault();
      if (editFormData) {
        // Ensure editFormData is not null
        dispatch({ type: "UPDATE_LISTING", payload: editFormData });
        setProduct(editFormData);
        setIsEditing(false);
      }
    },
    [editFormData, dispatch]
  );

  // Handle canceling edit mode
  const handleCancelEdit = useCallback(() => {
    setIsEditing(false);
    // Reset form data to the current product state
    setEditFormData({ ...product });
  }, [product]); // Depend on product to ensure correct reset

  // Memoize filtering customer interests for performance if list is very large
  const relevantCustomerInterests = React.useMemo(() => {
    return customerInterests.filter(
      (interest) => interest.productId === productId
    );
  }, [customerInterests, productId]);

  // Handlers for customer interest actions (using useCallback for stability)
  const handleAcceptInterest = useCallback(
    (interestId) => {
      dispatch({
        type: "UPDATE_CUSTOMER_INTEREST",
        payload: { id: interestId, status: "Accepted" },
      });
    },
    [dispatch]
  );

  const handleDeclineInterest = useCallback(
    (interestId) => {
      dispatch({
        type: "UPDATE_CUSTOMER_INTEREST",
        payload: { id: interestId, status: "Declined" },
      });
    },
    [dispatch]
  );

  // Render loading state or "product not found" if product is null
  if (!product) {
    return (
      <div className="product-detail-loading">Loading product details...</div>
    );
  }

  // --- Render Functions for Conditional Parts ---
  const renderProductInfo = () => (
    <>
      <h1 className="product-title">{product.title}</h1>
      <p className={`product-status-badge ${product.status.toLowerCase()}`}>
        {product.status}
      </p>
      <p className="product-small-description">{product.smallDescription}</p>
      <p className="product-full-description">
        <span className="description-heading">Full Description:</span>{" "}
        {product.description || "No full description provided."}
      </p>
      <p className="product-uploaded-date">Uploaded: {product.uploaded}</p>
      <button className="edit-button" onClick={() => setIsEditing(true)}>
        Edit Product
      </button>
    </>
  );

  const renderEditForm = () => (
    <form onSubmit={handleSaveEdit} className="edit-product-form">
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={editFormData?.title || ""} // Use optional chaining and fallback for safety
          onChange={handleEditFormChange}
          required
        />
      </label>
      <label>
        Short Description:
        <textarea
          name="smallDescription"
          value={editFormData?.smallDescription || ""}
          onChange={handleEditFormChange}
          required
          rows="3"
        ></textarea>
      </label>
      <label>
        Full Description:
        <textarea
          name="description"
          value={editFormData?.description || ""}
          onChange={handleEditFormChange}
          rows="5"
        ></textarea>
      </label>
      <label className="file-input-label">
        Change Image:
        <input
          type="file"
          accept="image/*"
          onChange={handleEditImageChange}
          className="hidden-file-input"
        />
      </label>
      {editFormData?.image && (
        <div className="image-preview">
          <img src={editFormData.image} alt="New Image Preview" />
        </div>
      )}
      <label>
        Status:
        <select
          name="status"
          value={editFormData?.status || "Available"}
          onChange={handleEditFormChange}
        >
          <option value="Available">Available</option>
          <option value="Swapped">Swapped</option>
        </select>
      </label>
      <div className="form-actions">
        <button type="submit" className="save-button">
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleCancelEdit}
          className="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="product-detail-page">
      <button className="back-button" onClick={() => navigate("/myDashboard")}>
        ← Back to Listings
      </button>

      <div className="product-detail-card">
        <div className="product-media-section">
          <div className="main-image-wrapper">
            <img
              src={product.image}
              alt={product.title}
              className="main-product-image"
            />
          </div>
          <div className="thumbnail-gallery">
            {/* Map through actual additional images if available, otherwise use placeholders */}
            {/* Example: {product.additionalImages?.map((img, index) => (...))} */}
            <div className="thumbnail-item">
              <img src={product.image} alt="Thumbnail 1" />
            </div>
            <div className="thumbnail-item">
              <img
                src="https://via.placeholder.com/100x100/CCCCCC/888888?text=Thumb2"
                alt="Thumbnail 2"
              />
            </div>
            <div className="thumbnail-item">
              <img
                src="https://via.placeholder.com/100x100/DDDDDD/666666?text=Thumb3"
                alt="Thumbnail 3"
              />
            </div>
            <div className="thumbnail-item">
              <img
                src="https://via.placeholder.com/100x100/EEEEEE/444444?text=Thumb4"
                alt="Thumbnail 4"
              />
            </div>
          </div>
        </div>

        <div className="product-info-section">
          {isEditing ? renderEditForm() : renderProductInfo()}
        </div>
      </div>

      <div className="interested-customers-section">
        <h2>Interested Customers</h2>
        {relevantCustomerInterests.length > 0 ? (
          <div className="customer-list">
            {relevantCustomerInterests.map((interest) => (
              <CustomerInterestItem
                key={interest.id}
                interest={interest}
                onAccept={handleAcceptInterest}
                onDecline={handleDeclineInterest}
              />
            ))}
          </div>
        ) : (
          <p className="no-customers">
            No customers are currently interested in this product.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
