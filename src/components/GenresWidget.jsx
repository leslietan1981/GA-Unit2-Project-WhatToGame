import React from "react";
import css from "../styles/Widget.module.css";

const GenresWidget = (props) => {
  return (
    <div className={`${css["widget-tile"]} ${css["w1"]} ${css["h1"]}`}>
      <div className={css["title"]}>Wishlist Genres</div>
      {props.genres.length > 4
        ? props.genres.slice(0, 3).map((genreObj, idx) => <div key={idx}>{genreObj.name}</div>)
        : props.genres.map((genreObj, idx) => <div key={idx}>{genreObj.name}</div>)}
      {props.genres.length > 4 && <div>{`+${props.genres.length - 3} more`}</div>}
    </div>
  );
};

export default GenresWidget;
