import React from "react";
import css from "../styles/App.module.css";
import PlatformTag from "./PlatformTag";
import { getParentObj } from "../utils/platformTagUtil";

const GameCard = (props) => {
  const { name, background_image, released, platforms } = props.gameDetails;
  const tagIds = [];

  return (
    <div className={`${css["card"]} ${css["game-tile"]}`}>
      <img src={background_image} onClick={() => props.handleAddToWishlist(props.gameDetails)} />
      <div className={css["title"]}>{name}</div>
      <ul>
        <li
          className={css["released"]}
        >{`${new Date(released) > new Date() ? "Available date:" : "Released date:"} ${released}`}</li>
        <li className={css["platforms"]}>
          <div>
            {platforms && platforms.length > 0
              ? platforms.map((item, idx) => {
                  const parentTagObj = getParentObj(item.platform.slug);
                  if (tagIds.includes(parentTagObj.id)) return;
                  tagIds.push(parentTagObj.id);

                  return (
                    parentTagObj && (
                      <PlatformTag
                        key={idx}
                        slug={parentTagObj.slug}
                        name={parentTagObj.name}
                        onClick={() => props.handleTagClick(parentTagObj)}
                      />
                    )
                  );
                })
              : "No platforms listed"}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GameCard;
