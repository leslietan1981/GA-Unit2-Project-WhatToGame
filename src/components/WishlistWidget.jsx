import React from "react";
import TotalGamesWidget from "./TotalGamesWidget";
import css from "../styles/Widget.module.css";
import GenresWidget from "./GenresWidget";
import LatestAdditionWidget from "./LatestAdditionWidget";
import OPMonWidget from "../easteregg/OPMonWidget";

const WishlistWidget = (props) => {
  return (
    <div className={css["widget"]}>
      <TotalGamesWidget total={props.data.length} onClick={props.handleManage} />
      <GenresWidget genres={props.genres} />
      <LatestAdditionWidget name={props.latestAddition.name} imageUrl={props.latestAddition.background_image} />
      <OPMonWidget />
    </div>
  );
};

export default WishlistWidget;
