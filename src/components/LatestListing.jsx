import React, { useEffect, useState } from "react";
import css from "./App.module.css";
import { devLatestGames } from "../services/devLatestGames";
import GameCard from "./GameCard";
import TagFilter from "./TagFilter";
import { useLatestGames } from "../services/getLatestGames";
import { getParentPlatformParameter } from "./platformTagUtil";

const LatestListing = () => {
  const [filterTags, setFilterTags] = useState([]);
  const [latestGames, setLatestGames] = useLatestGames();

  useEffect(() => {
    const controller = new AbortController();
    setLatestGames(controller, getParentPlatformParameter(filterTags));

    return () => controller.abort();
  }, [filterTags]);

  const handleCardTagClick = (tagObj) => {
    if (filterTags.includes(tagObj)) return;
    setFilterTags((prevState) => [...prevState, tagObj]);
  };

  const handleFilterTagClick = (tagObj) => {
    if (!filterTags.includes(tagObj)) return;
    setFilterTags((prevState) => [...prevState.toSpliced(prevState.indexOf(tagObj), 1)]);
  };

  return (
    <div>
      <div>Latest Games</div>
      <TagFilter tags={filterTags} handleTagClick={handleFilterTagClick} />
      <div className={css["grid-listing"]}>
        {latestGames.results &&
          latestGames.results.map((gameDetails, idx) => (
            <GameCard key={idx} gameDetails={gameDetails} handleTagClick={handleCardTagClick} />
          ))}
      </div>
    </div>
  );
};

export default LatestListing;
