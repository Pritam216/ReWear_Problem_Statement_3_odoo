import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserDashboard.css";
import "./Navbar.css";
import "./UserProfile.css";
import "./EditProfileModal.css";

// Component Imports
import Navbar from "./Navbar";
import UserProfile from "./UserProfile";
import UserListingsGrid from "./UserListingsGrid";
import UserPurchasesGrid from "./UserPurchasesGrid";
import EditProfileModal from "./EditProfileModal";

// Dummy Listings
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

// Dummy Purchases
const dummySwaps = [
  {
    id: 101,
    title: "Vintage Tee",
    image: "/images/tee.jpg",
    status: "Redeemed",
    uploaded: "2025-07-09",
  },
];

// Main Component
const UserDashboard = () => {
  const navigate = useNavigate();
  // Handler to open product detail page
  const handleProductClick = (productId) => {
    navigate(`/myDashboard/listings/${productId}`);
  };
  const [user, setUser] = useState({
    name: "Anika Sharma",
    email: "anika@example.com",
    phone: "+91 98765 43210",
    address: "Kolkata, West Bengal",
    bio: "Fashion lover and sustainability enthusiast!",
    points: 120,
    profileImage: "images/dummy_profile.png", // ✅ initial profile image
  });

  const [isModalOpen, setModalOpen] = useState(false);

  // Handle profile update from modal
  const handleSaveProfile = (updatedData) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...updatedData,
    }));
    setModalOpen(false);
  };

  return (
    <div className="dashboard-wrapper">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <UserProfile user={user} onEdit={() => setModalOpen(true)} />

      {/* My Listings */}
      <UserListingsGrid
        listings={dummyListings}
        onProductClick={handleProductClick}
      />

      {/* My Purchases / Swaps */}
      <UserPurchasesGrid purchases={dummySwaps} />

      {/* Edit Modal */}
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
