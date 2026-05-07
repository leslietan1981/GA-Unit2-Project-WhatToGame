import React from "react";
import css from "../styles/App.module.css";

const Four0Four = (props) => {
  return (
    <div>
      <div className={css["back"]} onClick={props.handleBackToIndex}>{`◀︎ BACK`}</div>
      <div>404 Page Not Found</div>
    </div>
  );
};

export default Four0Four;
