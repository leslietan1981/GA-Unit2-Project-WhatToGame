import React from "react";
import css from "../styles/Widget.module.css";

const GenresWidget = (props) => {
  return (
    <div className={`${css["widget-tile"]} ${css["w1"]} ${css["h1"]}`}>
      <div className={css["title"]}>Wishlist Genres</div>
      <div className={css["list"]}>
        {props.genres.length > 6
          ? props.genres.slice(0, 5).map((genreObj, idx) => (
              <div className={css["list-item"]} key={idx}>
                {genreObj.name}
              </div>
            ))
          : props.genres.map((genreObj, idx) => (
              <div className={css["list-item"]} key={idx}>
                {genreObj.name}
              </div>
            ))}
      </div>
      {props.genres.length > 6 && <div className={css["list-more"]}>{`+${props.genres.length - 5} more`}</div>}
    </div>
  );
};

export default GenresWidget;
