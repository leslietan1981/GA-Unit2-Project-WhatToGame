import React from "react";
import css from "./App.module.css";
import { getTagClassName } from "./platformTagUtil";

const PlatformTag = (props) => {
  return (
    <div className={`${css["platform-tag"]} ${css[getTagClassName(props.slug)]}`} onClick={props.onClick || undefined}>
      {props.name}
    </div>
  );
};

export default PlatformTag;
