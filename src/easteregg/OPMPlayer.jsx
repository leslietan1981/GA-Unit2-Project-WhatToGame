import React from "react";
import opcss from "./OPM.module.css";

const eyeStyles = ["eye-state-up", "eye-state-left", "eye-state-down", "eye-state-right"];

const getEyeStyle = (direction) => {
  return direction >= 0 && direction < eyeStyles.length ? eyeStyles[direction] : "";
};

const OPMPlayer = (props) => {
  return (
    <div className={`${opcss["player-base"]} ${opcss[getEyeStyle(props.direction)]}`}>
      <div className={opcss["player-eye"]}>●</div>
      <div className={opcss["player-eye"]}>●</div>
    </div>
  );
};

export default OPMPlayer;
