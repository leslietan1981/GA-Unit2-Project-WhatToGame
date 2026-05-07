import { opmMazeData, opmMazeSize } from "./opmMazeData";

const checkPathInDirection = (srcTile, direction, steps = 1) => {
  if (opmMazeData && srcTile && direction > -1) {
    let { row: rowIdx, col: colIdx } = srcTile;
    if (direction % 2 === 0) {
      rowIdx += (direction - 1) * steps;
    } else {
      colIdx += (direction - 2) * steps;
    }
    if (rowIdx >= 0 && rowIdx < opmMazeSize.rows && colIdx >= 0 && colIdx < opmMazeSize.columns) {
      const destinationTile = opmMazeData[rowIdx][colIdx];
      return destinationTile.type === 0 ? { row: rowIdx, col: colIdx } : null;
    }
  }
  return null;
};

const getClosestPath = (srcTile, destTile) => {
  let closestTile = null;
  let closestTileDist = -1;
  let tileDirection = -1;

  if (srcTile) {
    for (let direction = 0; direction < 4; direction++) {
      const checkTile = checkPathInDirection(srcTile, direction);
      if (checkTile) {
        const checkTileDist = getDistance(checkTile, destTile);
        if ((closestTile && checkTileDist <= closestTileDist) || !closestTile) {
          if (checkTileDist === closestTileDist && getRandomSkip()) continue;
          closestTile = checkTile;
          closestTileDist = checkTileDist;
          tileDirection = direction;
        }
      }
    }
  }
  return [tileDirection, closestTile];
};

const getFurthestPath = (srcTile, destTile) => {
  let furthestTile = null;
  let furthestTileDist = -1;
  let tileDirection = -1;

  if (srcTile) {
    for (let direction = 0; direction < 4; direction++) {
      const checkTile = checkPathInDirection(srcTile, direction);
      if (checkTile) {
        const checkTileDist = getDistance(checkTile, destTile);
        if ((furthestTile && checkTileDist >= furthestTileDist) || !furthestTile) {
          if (checkTileDist === furthestTileDist && getRandomSkip()) continue;
          furthestTile = checkTile;
          furthestTileDist = checkTileDist;
          tileDirection = direction;
        }
      }
    }
  }
  return [tileDirection, furthestTile];
};

const getDistance = (pos1, pos2) => {
  const dx = pos2.col - pos1.col;
  const dy = pos2.row - pos1.row;
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

const getRandomSkip = () => {
  return Math.floor(Math.random() * 100) % 2 === 1;
};

const getTick = (minNum, maxNum) => {
  return Math.floor(Math.random() * (maxNum - minNum)) + minNum;
};

export { getClosestPath, getFurthestPath, getTick };
