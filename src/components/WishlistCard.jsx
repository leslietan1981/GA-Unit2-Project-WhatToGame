import React from "react";
import css from "../styles/App.module.css";
import { getParentObj } from "../utils/platformTagUtil";
import PlatformTag from "./PlatformTag";

const WishlistCard = (props) => {
  const { name, background_image, released, platforms, genres } = props.gameDetails;
  const tagIds = [];

  return (
    <div className={`${css["card"]} ${css["wishlist-tile"]}`}>
      <img src={background_image} alt="game cover image" />
      <div className={css["wishlist-details"]}>
        <div className={css["title"]}>{name}</div>
        <div className={css["body"]}>
          <div>{`Added on: ${props.createdTime.slice(0, 10)}`}</div>
          <div>{`${new Date(released) > new Date() ? "Available date:" : "Released date:"} ${released}`}</div>
          <div>{`Genres: ${genres.length > 0 ? genres.map((genreObj) => genreObj.name).join(", ") : "-"}`}</div>
        </div>
        <div className={css["platforms"]}>
          {platforms && platforms.length > 0
            ? platforms.map((item, idx) => {
                const parentTagObj = getParentObj(item.platform.slug);
                if (tagIds.includes(parentTagObj.id)) return;
                tagIds.push(parentTagObj.id);

                return (
                  parentTagObj && (
                    <PlatformTag key={idx} slug={parentTagObj.slug} name={parentTagObj.name} isSelected={true} />
                  )
                );
              })
            : "No platforms listed"}
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
