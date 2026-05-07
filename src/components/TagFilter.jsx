import React from "react";
import css from "../styles/App.module.css";
import PlatformTag from "./PlatformTag";
import { includedParentPlatforms, parentPlatformsData } from "../services/cached_datasets/parentPlatformsCached";

const TagFilter = (props) => {
  return (
    <div className={css["filter-tags"]}>
      <PlatformTag
        slug="all"
        name="ALL"
        isSelected={props.tags.length === 0}
        onClick={() => props.handleTagClick({ slug: "all" })}
      />
      {includedParentPlatforms.map((parentSlug, idx) => {
        const parentObj = parentPlatformsData.results.find((dataObj) => dataObj.slug === parentSlug);
        return (
          <PlatformTag
            key={idx}
            slug={parentObj.slug}
            name={parentObj.name}
            isSelected={props.tags.length === 0 || props.tags.some((tagObj) => tagObj.id === parentObj.id)}
            onClick={() => props.handleTagClick(parentObj)}
          />
        );
      })}
    </div>
  );
};

export default TagFilter;
