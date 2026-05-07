import React from "react";
import css from "./OPM.module.css";
import OPMPlayer from "./OPMPlayer";
import OPMGhost from "./OPMGhost";
import OPMGem from "./OPMGem";

const OPMTile = (props) => {
  const styles = ["maze-path", "maze-wall"];

  return (
    <div className={css[styles[props.type]]}>
      {props.hasGem && <OPMGem />}
      {props.hasPlayer && <OPMPlayer direction={props.playerDirection} />}
      {props.hasGhost && <OPMGhost direction={props.ghostDirection} />}
    </div>
  );
};

export default OPMTile;
