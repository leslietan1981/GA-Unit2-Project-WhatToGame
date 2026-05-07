import React from "react";
import css from "../styles/Widget.module.css";

const LatestAdditionWidget = (props) => {
  const backgroundImage = {
    backgroundImage: `url(${props.imageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className={`${css["widget-tile"]} ${css["w3"]} ${css["h2"]}`} style={backgroundImage}>
      <div></div>
      <div></div>
      <div className={css["float-tag"]}>
        <div className={css["label"]}>Latest Addition in Wishlist:</div>
        <div className={css["title"]}>{props.name}</div>
      </div>
    </div>
  );
};

export default LatestAdditionWidget;
