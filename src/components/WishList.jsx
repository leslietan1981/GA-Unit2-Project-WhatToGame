import React, { use, useEffect } from "react";
import { useWishlist } from "../services/getWishlist";
import WishlistCard from "./WishlistCard";
import DataContext from "../context/data-context";

const WishList = () => {
  const dataCtx = use(DataContext);
  const [wishlist, setWishlist] = useWishlist();

  useEffect(() => {
    const controller = new AbortController();
    setWishlist(controller);
    dataCtx.setWishlistIsUpdated(false);

    return () => controller.abort();
  }, [dataCtx.wishlistIsUpdated]);

  useEffect(() => {
    dataCtx.setWishlist(wishlist);
  }, [wishlist]);

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
