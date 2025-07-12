import "./UserDashboard.css";
import "./Navbar.css";
import "./UserProfile.css";
import "./EditProfileModal.css";

import Navbar from "./Navbar";
import UserProfile from "./UserProfile";
import UserListingsGrid from "./UserListingsGrid";
import UserPurchasesGrid from "./UserPurchasesGrid";
import EditProfileModal from "./EditProfileModal";

import React, { useState } from "react";

const dummyListings = [
  {
    id: 1,
    title: "Denim Jacket",
    image: "/images/jacket.jpg",
    status: "Available",
    uploaded: "2025-07-10",
  },
  {
    id: 2,
    title: "Floral Dress",
    image: "/images/dress.jpg",
    status: "Swapped",
    uploaded: "2025-07-08",
  },
];

const dummySwaps = [
  {
    id: 101,
    title: "Vintage Tee",
    image: "/images/tee.jpg",
    status: "Redeemed",
    uploaded: "2025-07-09",
  },
];

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: "Anika Sharma",
    email: "anika@example.com",
    phone: "+91 98765 43210",
    address: "Kolkata, West Bengal",
    bio: "Fashion lover and sustainability enthusiast!",
    points: 120,
  });

  const [isModalOpen, setModalOpen] = useState(false);

  const handleSaveProfile = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
    setModalOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <UserProfile user={user} onEdit={() => setModalOpen(true)} />
      <UserListingsGrid listings={dummyListings} />
      <UserPurchasesGrid purchases={dummySwaps} />
      {isModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default UserDashboard;
