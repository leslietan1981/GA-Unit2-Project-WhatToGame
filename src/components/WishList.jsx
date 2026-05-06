import React, { use, useEffect } from "react";
import WishlistCard from "./WishlistCard";
import DataContext from "../context/data-context";

const WishList = () => {
  const dataCtx = use(DataContext);

  return (
    <div>
      <div>Wishlist</div>
      <div>
        {wishlist.map((gameObj, idx) => (
          <WishlistCard key={idx} gameDetails={gameObj.game_json} />
        ))}
      </div>
    </div>
  );
};

export default WishList;
