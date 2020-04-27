import React, { useEffect, useState } from "react";

import LMForm from "./LMForm";
import LMGrid from "./LMGrid";

import { MIN_MAP_SIZE, DEFAULT_GRID_MAP } from "./constants";

const LevelMakerContainer = () => {
  const [grid, setGrid] = useState(DEFAULT_GRID_MAP);
  const [size, setSize] = useState(MIN_MAP_SIZE);

  const handleGenerate = (size) => {
    console.log(`grid size: ${size}`);

    // generate a matrix size x size
    let grid = [];
    for (let i = 0; i < size; i++) {
      grid[i] = new Array(size).fill(0);
    }
    setGrid(grid);
    setSize(size);
  };

  return (
    <div className="col s12 card-panel lime lighten-4">
      <LMForm generate={handleGenerate} />
      <LMGrid data={grid} size={size} key={size} />
    </div>
  );
};

export default LevelMakerContainer;
