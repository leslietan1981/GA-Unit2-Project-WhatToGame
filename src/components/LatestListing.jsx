import React, { use, useEffect, useState } from "react";
import css from "../styles/App.module.css";
import GameCard from "./GameCard";
import TagFilter from "./TagFilter";

const LatestListing = (props) => {
  const handleCardTagClick = (tagObj) => {
    if (props.filterTags.includes(tagObj)) return;
    props.setFilterTags((prevState) => [...prevState, tagObj]);
  };

  const handleFilterTagClick = (tagObj) => {
    if (!props.filterTags.includes(tagObj)) return;
    props.setFilterTags((prevState) => [...prevState.toSpliced(prevState.indexOf(tagObj), 1)]);
  };

  return (
    <div>
      <div>Latest Games</div>
      <TagFilter tags={props.filterTags} handleTagClick={handleFilterTagClick} />
      <div className={css["grid-listing"]}>
        {props.data.results &&
          props.data.results.map((gameDetails, idx) => (
            <GameCard
              key={idx}
              gameDetails={gameDetails}
              handleTagClick={handleCardTagClick}
              handleAddToWishlist={props.handleAddToWishlist}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestListing;
