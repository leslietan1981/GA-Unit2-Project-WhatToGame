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
      <div className={css["title"]}>Latest Addition</div>
    </div>
  );
};

export default LatestAdditionWidget;
