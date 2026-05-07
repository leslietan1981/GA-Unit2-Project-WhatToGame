import React from "react";
import TotalGamesWidget from "./TotalGamesWidget";
import css from "../styles/Widget.module.css";
import GenresWidget from "./GenresWidget";
import LatestAdditionWidget from "./LatestAdditionWidget";

const WishlistWidget = (props) => {
  return (
    <div className={css["widget"]}>
      <TotalGamesWidget total={props.data.length} />
      <GenresWidget genres={props.genres} />
      <LatestAdditionWidget imageUrl={props.latestAddition.background_image} />
    </div>
  );
};

export default WishlistWidget;
