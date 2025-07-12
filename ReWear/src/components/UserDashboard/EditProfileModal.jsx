import React, { useState } from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({ onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    bio: user.bio,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // ✅ Call save handler
    onClose(); // Close modal
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
          <input name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default EditProfileModal;
