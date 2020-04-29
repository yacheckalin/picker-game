import React, { useState } from "react";

import LMForm from "./LMForm";
import LMGrid from "./LMGrid";

import { MIN_MAP_SIZE, DEFAULT_GRID_MAP } from "../../constants";
import shortid from "shortid";

const LevelMakerContainer = React.memo(() => {
  const [grid, setGrid] = useState(DEFAULT_GRID_MAP);
  const [size, setSize] = useState(MIN_MAP_SIZE);
  const [gridHash, setGridHash] = useState(shortid.generate());

  const handleGenerate = (size) => {
    // generate a matrix size x size
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = new Array(size).fill(0);
    }
    setGrid(grid);
    setSize(size);
    setGridHash(shortid.generate());
  };

  return (
    <div className="col s12 card-panel lime lighten-4">
      <LMForm generate={handleGenerate} gridData={grid} />

      <LMGrid data={grid} size={size} key={gridHash} />
    </div>
  );
});

export default LevelMakerContainer;
