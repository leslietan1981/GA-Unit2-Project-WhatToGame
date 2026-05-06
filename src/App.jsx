import React, { useState } from "react";
import LatestListing from "./components/LatestListing";
import WishList from "./components/WishList";
import DataContext from "./context/data-context";

globalThis.mockRequests = false;

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistIsUpdated, setWishlistIsUpdated] = useState(false);
  return (
    <div>
      <DataContext.Provider value={{ wishlistIsUpdated, setWishlistIsUpdated, wishlist, setWishlist }}>
        <WishList />
        <LatestListing />
      </DataContext.Provider>
    </div>
  );
}

export default App;
