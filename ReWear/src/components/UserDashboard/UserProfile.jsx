import React from "react";
import "./UserProfile.css";

const UserProfile = ({ user, onEdit }) => {
  return (
    <div className="profile-section">
      <div className="left-column">
        <img
          src={user.profileImage || "images/dummy_profile.png"}
          alt="profile"
          className="profile-img"
        />
      </div>

      <div className="right-column">
        <div className="header-row">
          <h2>{user.name}</h2>
          <div className="green-points">
            🌿 <span>{user.points}</span> Green Points
          </div>
        </div>

        <p className="info-box">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="info-box">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="info-box">
          <strong>Address:</strong> {user.address}
        </p>
        <p className="info-box">
          <strong>Bio:</strong> {user.bio}
        </p>

        <button className="edit-btn" onClick={onEdit}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
