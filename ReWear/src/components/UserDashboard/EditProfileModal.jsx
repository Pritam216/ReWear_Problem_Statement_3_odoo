import React, { useState } from "react";
import "./EditProfileModal.css";

const EditProfileModal = ({ onClose, user, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    phone: user.phone,
    address: user.address,
    bio: user.bio,
    profileImage: user.profileImage || "images/dummy_profile.png",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="image-upload-wrapper">
            <img
              src={formData.profileImage}
              alt="Profile Preview"
              className="profile-preview"
            />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
          />
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
