import React from "react";
import css from "../styles/Widget.module.css";
import OPMGrid from "./OPMGrid";

const OPMonWidget = () => {
  return (
    <div
      className={`${css["widget-tile"]} ${css["w3"]} ${css["h2"]}`}
      onClick={() => window.open("https://leslietan1981.github.io/GA-Unit1-Project-OPmon/", "_blank", "noreferrer")}
    >
      <OPMGrid />
    </div>
  );
};

export default OPMonWidget;
