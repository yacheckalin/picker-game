import React, { useState } from "react";
import PropTypes from "prop-types";

import { MIN_MAP_SIZE, MAX_MAP_SIZE } from "./constants";

const LMForm = ({ generate }) => {
  const [mapSize, setMapSize] = useState(MIN_MAP_SIZE);

  return (
    <div className="card-panel">
      <div className="row">
        <div className="input-field col s12">
          <input
            value={mapSize}
            id="level-maker-grid-size"
            type="number"
            className="validate"
            min="3"
            max="50"
            onChange={(e) => setMapSize(e.target.value)}
          />
          <label htmlFor="level-maker-grid-size">
            Choose size {`[${MIN_MAP_SIZE} - ${MAX_MAP_SIZE}]`}:
          </label>
        </div>
      </div>
      <div className="row">
        <a className="btn" onClick={(e) => generate(parseInt(mapSize))}>
          Generate
        </a>
      </div>
    </div>
  );
};

LMForm.propTypes = {
  generate: PropTypes.func.isRequired,
};

export default LMForm;
