import React, { useState } from "react";
import GridMessage from "./GridMessage";
import GridIntro from "./GridIntro";
import GridContainer from "./GridContainer";

import PropTypes from "prop-types";

import { DEFAULT_FIELD_SIZE, DEFAUTL_FIELD_HASH } from "../constants";

import { LEVELS } from "../levels";

const Playground = ({ menuBar }) => {
  const [logMessage, setLogMessage] = useState(
    "You can make a move! [right, left, up, down, space, alt, enter]"
  );
  const [grid, setGrid] = useState(LEVELS[0][1]); // use default level
  const [gridSize, setGridSize] = useState(DEFAULT_FIELD_SIZE);
  const [gridHash, setGridHash] = useState(DEFAUTL_FIELD_HASH);

  const handleLoadLevel = ([gridHash, grid, gridSize]) => {
    setGrid(grid);
    setGridHash(gridHash);
    setGridSize(gridSize);
  };

  return (
    <div className="row">
      {menuBar && <GridIntro loadHandler={handleLoadLevel} />}
      <GridContainer
        handleMessage={setLogMessage}
        mapper={grid}
        size={gridSize}
        key={gridHash}
      />
      <GridMessage log={logMessage} />
    </div>
  );
};

Playground.propTypes = {
  menuBar: PropTypes.bool.isRequired,
};

Playground.defaultProps = {
  menuBar: true,
};

export default Playground;
