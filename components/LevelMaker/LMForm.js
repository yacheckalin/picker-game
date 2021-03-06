import React, { useState } from "react";
import PropTypes from "prop-types";

import { MIN_MAP_SIZE, MAX_MAP_SIZE } from "../../constants";
import { useLocalStorage } from "../../helpers";
import { validateLevelForExport } from "./validations";

const LMForm = ({ generate, gridData }) => {
  const [mapSize, setMapSize] = useState(MIN_MAP_SIZE);
  const [mapHash, setMapHash] = useState("");
  const [mapMission, setMapMission] = useState("");
  const [swap, setSwap] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [info, setInfo] = useState(``);

  const [level, setLevel] = useLocalStorage(`level_${mapHash}`, ``, true);

  const handleSaveData = () => {
    let newLevel = [];
    newLevel.push(mapHash);
    newLevel.push(gridData);
    newLevel.push(parseInt(mapSize));
    newLevel.push(mapMission);

    try {
      validateLevelForExport(newLevel);
      setSwap(true);
      setLevel(JSON.stringify(newLevel));
      setInfo(`Data were copyied to localStorage!`);
      setIsSaved(true);

      // re-init form
      setMapSize(MIN_MAP_SIZE);
      setMapHash("");
      setMapMission("");
    } catch (e) {
      setInfo(e.message);
    }
  };

  return (
    <div className="card-panel">
      <div className="row">
        {!swap && (
          <>
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
            <div className="input-field col s6">
              <input
                value={mapHash}
                type="text"
                onChange={(e) => setMapHash(e.target.value)}
                id="level-maker-grid-hash"
                className="validate"
              />
              <label htmlFor="level-maker-grid-hash">Level Hash</label>
            </div>
            <div className="input-field col s6">
              <textarea
                value={mapMission}
                type="text"
                onChange={(e) => setMapMission(e.target.value)}
                id="level-maker-grid-mission"
                className="materialize-textarea validate"
              />
              <label htmlFor="level-maker-grid-mission">Level Mission</label>
            </div>
          </>
        )}
      </div>

      <div className="row">
        {!swap && (
          <a
            className={`btn col s2 ${
              mapSize > MAX_MAP_SIZE ||
              mapSize < MIN_MAP_SIZE ||
              !mapHash ||
              !mapMission
                ? `disabled`
                : ``
            }`}
            onClick={(e) => {
              generate(parseInt(mapSize));
              setIsSaved(false);
              setInfo(`Map has been generated`);
              setSwap(!swap);
            }}
          >
            Generate
          </a>
        )}
        <a className="btn col s2" onClick={(e) => setSwap(!swap)}>
          {swap ? `Show` : `Hide`}
        </a>
        {!isSaved && (
          <>
            <a
              className={`btn ${
                mapSize > MAX_MAP_SIZE ||
                mapSize < MIN_MAP_SIZE ||
                !mapHash ||
                !mapMission
                  ? `disabled`
                  : ``
              }`}
              onClick={handleSaveData}
            >
              Save
            </a>
          </>
        )}
        <LMFormInfo message={info} />
      </div>
    </div>
  );
};

const LMFormInfo = ({ message }) => (
  <span className="secondary-content orange-text">{message}</span>
);

LMForm.propTypes = {
  generate: PropTypes.func.isRequired,
  gridData: PropTypes.array.isRequired,
};

export default LMForm;
