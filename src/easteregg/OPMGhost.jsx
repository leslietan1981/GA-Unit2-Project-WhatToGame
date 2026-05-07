import React from "react";
import opcss from "./OPM.module.css";

const eyeStyles = ["eye-state-up", "eye-state-left", "eye-state-down", "eye-state-right"];

const getEyeStyle = (direction) => {
  return direction >= 0 && direction < eyeStyles.length ? eyeStyles[direction] : "";
};

const OPMGhost = (props) => {
  return (
    <div className={`${opcss["ghost-base"]} ${opcss[getEyeStyle(props.direction)]}`}>
      <div className={opcss["ghost-eye"]}>▼</div>
      <div className={opcss["ghost-eye"]}>▼</div>
    </div>
  );
};

export default OPMGhost;
