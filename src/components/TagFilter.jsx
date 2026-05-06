import React from "react";
import css from "../styles/App.module.css";
import PlatformTag from "./PlatformTag";

const TagFilter = (props) => {
  return (
    <div className={css["filter-tags"]}>
      {props.tags.map((tagObj, idx) => (
        <PlatformTag key={idx} slug={tagObj.slug} name={tagObj.name} onClick={() => props.handleTagClick(tagObj)} />
      ))}
    </div>
  );
};

export default TagFilter;
