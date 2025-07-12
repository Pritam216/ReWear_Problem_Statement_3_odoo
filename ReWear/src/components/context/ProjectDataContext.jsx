// src/context/ProjectDataContext.jsx
import React, { createContext, useReducer, useEffect } from "react";

// --- Initial Dummy Data (used only as fallback) ---
const initialListings = [];

const initialCustomerInterests = [
  {
    id: "ci1",
    productId: "1",
    customerName: "Alice",
    message: "I love this jacket! Is it still available?",
    status: "Pending",
  },
  {
    id: "ci2",
    productId: "1",
    customerName: "Bob",
    message: "Interested in a swap for a graphic tee?",
    status: "Accepted",
  },
  {
    id: "ci3",
    productId: "2",
    customerName: "Charlie",
    message: "Can you tell me more about the wool type?",
    status: "Declined",
  },
  {
    id: "ci4",
    productId: "4",
    customerName: "David",
    message: "Is shipping available?",
    status: "Pending",
  },
];

// --- Initial State Loader (NO localStorage interaction) ---
const getInitialState = () => ({
  listings: initialListings,
  customerInterests: initialCustomerInterests,
});

// --- Reducer Function ---
function projectDataReducer(state, action) {
  console.log(
    "ProjectDataContext: Reducer received action:",
    action.type,
    "with payload:",
    action.payload
  );
  switch (action.type) {
    case "SET_LISTINGS":
      return { ...state, listings: action.payload };
    case "ADD_LISTING":
      const updatedListings = [action.payload, ...state.listings]; // Add new item to the beginning
      console.log(
        "ProjectDataContext: ADD_LISTING - New listings array length:",
        updatedListings.length
      );
      return { ...state, listings: updatedListings };
    case "UPDATE_LISTING":
      return {
        ...state,
        listings: state.listings.map((listing) =>
          listing.id === action.payload.id ? action.payload : listing
        ),
      };
    case "DELETE_LISTING":
      return {
        ...state,
        listings: state.listings.filter(
          (listing) => listing.id !== action.payload
        ),
      };
    case "UPDATE_CUSTOMER_INTEREST":
      return {
        ...state,
        customerInterests: state.customerInterests.map((interest) =>
          interest.id === action.payload.interestId
            ? { ...interest, status: action.payload.newStatus }
            : interest
        ),
      };
    case "SET_CUSTOMER_INTERESTS":
      return { ...state, customerInterests: action.payload };
    case "RESET_PROJECT_DATA":
      // This action now simply resets to the initial dummy data
      return getInitialState();
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- Context Objects ---
// ProjectDataContext provides the state object
export const ProjectDataContext = createContext(getInitialState());
// ProjectDataDispatchContext provides the dispatch function
export const ProjectDataDispatchContext = createContext(() => {
  console.warn(
    "ProjectDataDispatchContext: dispatch called outside provider. This usually means the component is not wrapped by ProjectDataProvider."
  );
});

// --- Project Data Provider Component ---
export const ProjectDataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    projectDataReducer,
    null,
    getInitialState
  );

  // Fetch listings from backend on mount
  React.useEffect(() => {
    fetch("/public/listings")
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "SET_LISTINGS", payload: data });
      })
      .catch((err) => {
        console.error("Failed to fetch listings from backend", err);
      });
  }, []);

  return (
    <ProjectDataContext.Provider value={state}>
      <ProjectDataDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectDataDispatchContext.Provider>
    </ProjectDataContext.Provider>
  );
};

// --- Custom Hooks for Consumers ---
export function useProjectDataState() {
  const context = React.useContext(ProjectDataContext);
  if (!context) {
    throw new Error(
      "useProjectDataState must be used within a ProjectDataProvider"
    );
  }
  return context;
}

export function useProjectDataDispatch() {
  const context = React.useContext(ProjectDataDispatchContext);
  if (typeof context !== "function") {
    // Ensure it's a function (not the dummy default)
    throw new Error(
      "useProjectDataDispatch must be used within a ProjectDataProvider"
    );
  }
  return context;
}
