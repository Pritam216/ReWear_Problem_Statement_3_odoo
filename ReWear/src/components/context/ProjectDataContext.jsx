// src/context/ProjectDataContext.jsx
import React, { createContext, useReducer, useEffect } from "react";

// --- Initial Dummy Data ---
const initialListings = [
  {
    id: "1",
    title: "Vintage Denim Jacket",
    smallDescription: "A classic piece in great condition.",
    description:
      "This is a truly unique vintage denim jacket from the 80s, perfect for adding a retro touch to your wardrobe. It features a faded wash and minimal distressing, making it highly versatile for various styles. Originally sourced from a local thrift store, it has been professionally cleaned and is ready for its new owner. Ideal for casual outings or layering.",
    image: "https://via.placeholder.com/400x300/ADD8E6/000000?text=DenimJacket",
    uploaded: "2023-01-15",
    status: "Available",
  },
  {
    id: "2",
    title: "Hand-knitted Scarf",
    smallDescription: "Warm and cozy, made with natural wool.",
    description:
      "Luxuriously soft hand-knitted scarf, crafted with 100% organic merino wool. This unique piece offers exceptional warmth and breathability, perfect for cold winter days. Its intricate pattern showcases hours of dedicated craftsmanship. A sustainable choice for conscious consumers.",
    image: "https://via.placeholder.com/400x300/90EE90/000000?text=Scarf",
    uploaded: "2023-02-20",
    status: "Available",
  },
  {
    id: "3",
    title: "Ceramic Plant Pot",
    smallDescription: "Hand-painted, unique design.",
    description:
      "Add a touch of artistry to your plant collection with this hand-painted ceramic pot. Each pot features a unique, abstract design, ensuring no two are exactly alike. Made from durable, high-quality ceramic, it includes a drainage hole and a saucer. Perfect for small to medium-sized indoor plants.",
    image: "https://via.placeholder.com/400x300/FFB6C1/000000?text=PlantPot",
    uploaded: "2023-03-10",
    status: "Swapped",
  },
  {
    id: "4",
    title: "Leather Bound Journal",
    smallDescription: "Unused, perfect for notes or sketches.",
    description:
      "A beautifully crafted leather-bound journal with 200 pages of acid-free, cream-colored paper. Its rustic charm is enhanced by a genuine leather cover that ages gracefully. Ideal for journaling, sketching, or as a thoughtful gift. The compact size makes it easy to carry everywhere.",
    image: "https://via.placeholder.com/400x300/D3D3D3/000000?text=Journal",
    uploaded: "2023-04-01",
    status: "Available",
  },
  {
    id: "5",
    title: "Vintage Camera",
    smallDescription: "Collectable item, untested.",
    description:
      'A charming vintage camera, model "Zenith B", from the 1970s. This piece is ideal for collectors or as a decorative item. It has not been tested for functionality but appears to be in good cosmetic condition with minor signs of wear consistent with its age. A great conversation starter for any enthusiast.',
    image: "https://via.placeholder.com/400x300/FFD700/000000?text=Camera",
    uploaded: "2023-05-05",
    status: "Swapped",
  },
];

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
const getInitialState = () => {
  // Directly return the initial dummy data
  console.log(
    "ProjectDataContext: Initial state loaded (no localStorage). Listings count:",
    initialListings.length
  );
  return {
    listings: initialListings,
    customerInterests: initialCustomerInterests,
  };
};

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
  // useReducer initializes state using getInitialState once
  const [state, dispatch] = useReducer(
    projectDataReducer,
    null,
    getInitialState
  );

  // Removed useEffects for localStorage persistence
  // There are no side effects for saving/loading data now.

  return (
    <ProjectDataContext.Provider value={state}>
      <ProjectDataDispatchContext.Provider value={dispatch}>
        {children}{" "}
        {/* Renders all child components that need access to the context */}
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
