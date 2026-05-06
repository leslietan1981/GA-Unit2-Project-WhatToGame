import React, { use, useEffect, useState } from "react";
import css from "./App.module.css";
import { devLatestGames } from "../services/dev_datasets/devLatestGames";
import GameCard from "./GameCard";
import TagFilter from "./TagFilter";
import { useLatestGames } from "../services/getLatestGames";
import { getParentPlatformParameter } from "./platformTagUtil";
import { useAddGame } from "../services/addToWishlist";
import DataContext from "../context/data-context";

const LatestListing = () => {
  const dataCtx = use(DataContext);
  const [filterTags, setFilterTags] = useState([]);
  const [latestGames, setLatestGames] = useLatestGames();
  const addGameToWishlist = useAddGame();

  useEffect(() => {
    const controller = new AbortController();
    setLatestGames(controller, getParentPlatformParameter(filterTags));

    return () => controller.abort();
  }, [filterTags]);

  useEffect(() => {
    if (addGameToWishlist.isSuccess) dataCtx.setWishlistIsUpdated(true);
  }, [addGameToWishlist.isSuccess]);

  const handleCardTagClick = (tagObj) => {
    if (filterTags.includes(tagObj)) return;
    setFilterTags((prevState) => [...prevState, tagObj]);
  };

  const handleFilterTagClick = (tagObj) => {
    if (!filterTags.includes(tagObj)) return;
    setFilterTags((prevState) => [...prevState.toSpliced(prevState.indexOf(tagObj), 1)]);
  };

  const handleAddToWishlist = (gameObj) => {
    if (dataCtx.wishlist.some((wishlistObj) => wishlistObj.game_json.id === gameObj.id)) return;
    addGameToWishlist.request(gameObj);
  };

  return (
    <div>
      <div>Latest Games</div>
      <TagFilter tags={filterTags} handleTagClick={handleFilterTagClick} />
      <div className={css["grid-listing"]}>
        {latestGames.results &&
          latestGames.results.map((gameDetails, idx) => (
            <GameCard
              key={idx}
              gameDetails={gameDetails}
              handleTagClick={handleCardTagClick}
              handleAddToWishlist={handleAddToWishlist}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestListing;
