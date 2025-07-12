// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import UserDashboard from "./components/UserDashboard/UserDashboard.jsx";
import ProductDetailPage from "./components/Item_Listing/ProductDetailPage.jsx";
import Navbar from "./components/UserDashboard/Navbar.jsx";

import LandingPage from "./components/LandingPage/LandingPage.jsx";

// Import the ProjectDataProvider
import { ProjectDataProvider } from "./components/context/ProjectDataContext.jsx";

function App() {
  const handleUpdateListing = (updatedListing) => {
    console.log("Updating listing:", updatedListing);
  };

  const handleUpdateCustomerInterest = (interestId, newStatus) => {
    console.log(`Updating interest ${interestId} to status: ${newStatus}`);
  };

  return (
    // Wrap the entire Router with ProjectDataProvider
    // This makes the context available to all components rendered within the routes
    <ProjectDataProvider>
      {" "}
      {/* <-- ADD THIS WRAPPER */}
      <Router>
        <Routes>
          <Route path="/myDashboard/*" element={<UserDashboard />} />
          <Route
            path="/myDashboard/listings/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </ProjectDataProvider>
  );
}

export default App;
