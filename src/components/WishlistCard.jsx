import React from "react";
import css from "./App.module.css";

const WishlistCard = (props) => {
  const { name, background_image, released, platforms } = props.gameDetails;

  return (
    <div className={css["wishlist-tile"]}>
      <img src={background_image} />
      <div>
        <div>{name}</div>
        <div>{`${new Date(released) > new Date() ? "Available date:" : "Released date:"} ${released}`}</div>
        <div>{}</div>
      </div>
    </div>
  );
};

export default WishlistCard;
