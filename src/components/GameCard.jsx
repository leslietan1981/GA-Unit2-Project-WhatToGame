import React from "react";
import css from "./App.module.css";

const GameCard = (props) => {
  const { name, background_image, released, platforms } = props.gameDetails;
  return (
    <div className={`${css["card"]} ${css["game-tile"]}`}>
      <img src={background_image} />
      <div className={css["title"]}>{name}</div>
      <ul>
        <li className={css["released"]}>{`Released date: ${released}`}</li>
        <li className={css["platforms"]}>{platforms && platforms.map((item, idx) => item.platform.name).join(", ")}</li>
      </ul>
    </div>
  );
};

export default GameCard;
