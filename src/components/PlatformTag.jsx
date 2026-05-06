import React from "react";
import css from "../styles/App.module.css";
import { getTagClassName } from "../utils/platformTagUtil";

const PlatformTag = (props) => {
  return (
    <div className={`${css["platform-tag"]} ${css[getTagClassName(props.slug)]}`} onClick={props.onClick || undefined}>
      {props.name}
    </div>
  );
};

export default PlatformTag;
