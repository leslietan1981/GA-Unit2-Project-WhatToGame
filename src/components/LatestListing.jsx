import React, { use, useEffect, useState } from "react";
import css from "../styles/App.module.css";
import GameCard from "./GameCard";
import TagFilter from "./TagFilter";

const LatestListing = (props) => {
  const handleFilterTagClick = (tagObj) => {
    switch (true) {
      case tagObj.slug === "all":
        props.setFilterTags([]);
        return;
      case props.filterTags.includes(tagObj):
        props.setFilterTags((prevState) => [...prevState.toSpliced(prevState.indexOf(tagObj), 1)]);
        return;
      default:
        props.setFilterTags((prevState) => [...prevState, tagObj]);
        return;
    }
  };

  return (
    <div className={css["section"]}>
      <div className={css["section-header"]}>
        <div className={css["section-title"]}>LATEST GAMES</div>
        <TagFilter tags={props.filterTags} handleTagClick={handleFilterTagClick} />
      </div>

      <div className={css["grid-listing"]}>
        {props.data.results &&
          props.data.results.map((gameDetails, idx) => (
            <GameCard
              key={idx}
              gameDetails={gameDetails}
              handleTagClick={handleFilterTagClick}
              handleAddToWishlist={props.handleAddToWishlist}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestListing;
