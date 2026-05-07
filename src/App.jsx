import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import LatestListing from "./components/LatestListing";
import WishlistWidget from "./components/WishlistWidget";
import { useWishlist } from "./services/getWishlist";
import { useLatestGames } from "./services/getLatestGames";
import { getParentPlatformParameter } from "./utils/platformTagUtil";
import { useAddGame } from "./services/addToWishlist";
import { routerPaths } from "./utils/routerPathUtil";
import ManageWishList from "./components/ManageWishList";
import FourOFour from "../../SEB-62-HW/unit-2/6-react-router-dom-lab/leslie/src/components/FourOFour";
import { useRemoveGame } from "./services/removeFromWishlist";

globalThis.mockRequests = false;

function App() {
  const wishlist = useWishlist();
  const latestGames = useLatestGames();
  const addGame = useAddGame();
  const removeGame = useRemoveGame();
  const [filterTagsLG, setFilterTagsLG] = useState([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    wishlist.request(controller);

    return () => controller.abort();
  }, [addGame.successCount, removeGame.successCount]);

  useEffect(() => {
    const controller = new AbortController();
    latestGames.request(controller, getParentPlatformParameter(filterTagsLG));

    return () => controller.abort();
  }, [filterTagsLG]);

  const addToWishlist = (gameObj) => {
    if (wishlist.data.some((wishlistObj) => wishlistObj.game_json.id === gameObj.id)) return;
    addGame.request(gameObj);
  };

  const removeFromWishlist = (gameObj) => {
    removeGame.request(gameObj.id);
  };

  return (
    <div className="wrapper">
      <div className="wrapper-row">
        <Routes>
          <Route
            path={routerPaths.index}
            element={
              <>
                <WishlistWidget
                  data={wishlist.data}
                  genres={wishlist.genres}
                  latestAddition={wishlist.latestAddition}
                  handleManage={navigateTo}
                />
                <LatestListing
                  data={latestGames.data}
                  filterTags={filterTagsLG}
                  setFilterTags={setFilterTagsLG}
                  handleAddToWishlist={addToWishlist}
                />
              </>
            }
          />
          <Route
            path={routerPaths.manageWishlist}
            element={
              <ManageWishList
                data={wishlist.data}
                handleBackToIndex={() => navigateTo(routerPaths.index)}
                handleRemove={removeFromWishlist}
              />
            }
          />
          <Route path="*" element={<FourOFour />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
