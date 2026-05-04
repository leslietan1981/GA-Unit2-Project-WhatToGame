import React from "react";
import css from "./App.module.css";
import { devLatestGames } from "../services/devLatestGames";
import GameCard from "./GameCard";

const LatestListing = () => {
  const { count, nextURL, results } = devLatestGames;
  return (
    <div>
      <div>Latest Games</div>
      <div className={css["grid-listing"]}>
        {results.map((gameDetails, idx) => (
          <GameCard key={idx} gameDetails={gameDetails} />
        ))}
      </div>
    </div>
  );
};

export default LatestListing;
