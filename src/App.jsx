import React, { useEffect, useState } from "react";
import LatestListing from "./components/LatestListing";
import WishlistWidget from "./components/WishlistWidget";
import { useWishlist } from "./services/getWishlist";
import { useLatestGames } from "./services/getLatestGames";
import { getParentPlatformParameter } from "./utils/platformTagUtil";
import { useAddGame } from "./services/addToWishlist";

globalThis.mockRequests = false;

function App() {
  const wishlist = useWishlist();
  const latestGames = useLatestGames();
  const addGame = useAddGame();
  const [filterTagsLG, setFilterTagsLG] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    wishlist.request(controller);

    return () => controller.abort();
  }, [addGame.successCount]);

  useEffect(() => {
    const controller = new AbortController();
    latestGames.request(controller, getParentPlatformParameter(filterTagsLG));

    return () => controller.abort();
  }, []);

  const addToWishlist = (gameObj) => {
    if (wishlist.data.some((wishlistObj) => wishlistObj.game_json.id === gameObj.id)) return;
    addGame.request(gameObj);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-row">
        <WishlistWidget data={wishlist.data} genres={wishlist.genres} latestAddition={wishlist.latestAddition} />
        <LatestListing
          data={latestGames.data}
          filterTags={filterTagsLG}
          setFilterTags={setFilterTagsLG}
          handleAddToWishlist={addToWishlist}
        />
      </div>
    </div>
  );
}

export default App;
