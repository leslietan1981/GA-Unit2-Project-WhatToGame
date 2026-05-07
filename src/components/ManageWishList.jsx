import React, { use, useEffect } from "react";
import css from "../styles/App.module.css";
import WishlistCard from "./WishlistCard";

const ManageWishlist = (props) => {
  return (
    <div>
      <div className={css["back"]} onClick={props.handleBackToIndex}>{`◀︎ BACK`}</div>
      <div className={css["section-header"]}>
        <div className={css["section-title"]}>Your Wishlist</div>
      </div>
      <div className={css["wishlist-listing"]}>
        {props.data
          .toSorted((a, b) => new Date(b.createdTime) - new Date(a.createdTime))
          .map((gameObj, idx) => (
            <div key={idx} className={css["pair"]}>
              <div className={`${css["card"]} ${css["trash"]}`} onClick={() => props.handleRemove(gameObj)}>
                -
              </div>
              <WishlistCard gameDetails={gameObj.game_json} createdTime={gameObj.createdTime} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ManageWishlist;
