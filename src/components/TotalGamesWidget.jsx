import React from "react";
import css from "../styles/Widget.module.css";
import { routerPaths } from "../utils/routerPathUtil";

const TotalGamesWidget = (props) => {
  return (
    <div
      className={`${css["widget-tile"]} ${css["w1"]} ${css["h1"]}`}
      onClick={props.onClick && (() => props.onClick(routerPaths.manageWishlist))}
    >
      <div className={css["emphasis"]}>{props.total}</div>
      <div className={css["title"]}>games in wishlist</div>
    </div>
  );
};

export default TotalGamesWidget;
