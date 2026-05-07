import React, { useEffect, useRef, useState } from "react";
import opcss from "./OPM.module.css";
import css from "../styles/Widget.module.css";
import { opmMazeData, opmMazeSize } from "./opmMazeData";
import OPMTile from "./OPMTile";
import { getClosestPath, getFurthestPath, getTick } from "./opmLogicController";

const OPMGrid = () => {
  const logicRef = useRef({});
  const [playerTile, setPlayerTile] = useState({ row: 0, col: 0 });
  const [ghostTile, setGhostTile] = useState({ row: opmMazeSize.rows - 1, col: opmMazeSize.columns - 1 });
  const [score, setScore] = useState(0);

  const resetGems = () => {
    const gems = [];
    for (let r = 0; r < opmMazeSize.rows; r++) {
      const rowGems = [];
      gems.push(rowGems);

      for (let c = 0; c < opmMazeSize.columns; c++) {
        rowGems.push(opmMazeData[r][c].type === 0);
      }
    }
    return gems;
  };

  useEffect(() => {
    logicRef.current.playerTile = playerTile;
  }, [playerTile]);

  useEffect(() => {
    logicRef.current.ghostTile = ghostTile;
  }, [ghostTile]);

  useEffect(() => {
    logicRef.current.playerTick = 0;
    logicRef.current.playerDirection = -1;
    logicRef.current.ghostTick = 0;
    logicRef.current.ghostDirection = -1;
    logicRef.current.gems = resetGems();

    logicRef.intervalId = setInterval(() => {
      if (logicRef.current.playerTick <= 0) {
        const [furthestTileDirection, furthestTile] = getFurthestPath(
          logicRef.current.playerTile,
          logicRef.current.ghostTile,
        );
        setPlayerTile(furthestTile);
        logicRef.current.playerDirection = furthestTileDirection;
        logicRef.current.playerTick = getTick(2, 4);
      } else {
        logicRef.current.playerTick -= 1;
      }

      if (logicRef.current.ghostTick <= 0) {
        const [closestTileDirection, closestTile] = getClosestPath(
          logicRef.current.ghostTile,
          logicRef.current.playerTile,
        );
        setGhostTile(closestTile);
        logicRef.current.ghostDirection = closestTileDirection;
        logicRef.current.ghostTick = getTick(3, 5);
      } else {
        logicRef.current.ghostTick -= 1;
      }
    }, 100);
  }, []);

  return (
    <div className={css["fit"]}>
      <div className={css["header"]}>
        <div className={css["title"]}>OP MONSTER</div>
        <div className={css["title"]}>SCORE: {score}</div>
      </div>
      <div className={opcss["maze"]}>
        {opmMazeData.map((rowTiles, r) =>
          rowTiles.map((tile, c) => {
            let hasGem = logicRef.current.gems && logicRef.current.gems[r][c];
            let hasPlayer = r === playerTile.row && c === playerTile.col;
            if (hasGem && hasPlayer) {
              setScore((prevState) => prevState + 10);
              hasGem = false;
              logicRef.current.gems[r][c] = false;
              if (!logicRef.current.gems.some((row) => row.includes(true))) logicRef.current.gems = resetGems();
            }
            return (
              <OPMTile
                key={`${c}${r}`}
                type={tile.type}
                hasPlayer={hasPlayer}
                playerDirection={logicRef.current.playerDirection}
                hasGhost={r === ghostTile.row && c === ghostTile.col}
                ghostDirection={logicRef.current.ghostDirection}
                hasGem={hasGem}
              />
            );
          }),
        )}
      </div>
    </div>
  );
};

export default OPMGrid;
