import React, { useEffect, useState } from "react";
import { LEVELS } from "../levels";

const GridIntro = ({ loadHandler }) => {
  useEffect(() => {
    const callback = function () {
      const elems = document.querySelectorAll(".collapsible");
      const select = document.querySelectorAll("select");

      M.Collapsible.init(elems, {});
      M.FormSelect.init(select, {});
    };
    document.addEventListener("DOMContentLoaded", callback);
    return () => {
      document.removeEventListener("DOMContentLoaded", callback);
    };
  });

  const [mission, setMission] = useState("Open the BLUE DOOR!");

  const handleLevelChange = (e) => {
    const { value } = e.target;

    if (LEVELS[parseInt(value)] !== undefined) {
      setMission(LEVELS[parseInt(value)][3]);
      loadHandler(LEVELS[parseInt(value)]);
    }
  };

  return (
    <div className="col s12 card-panel lime lighten-4">
      <div className="row"></div>
      <blockquote>
        <ul className="collapsible">
          <li>
            <div className="collapsible-header">
              <i className="material-icons">flash_on</i> Load Level
            </div>
            <div className="collapsible-body">
              <div className="input-field ">
                <select onChange={handleLevelChange}>
                  <option value="" disabled>
                    Choose your level
                  </option>
                  {LEVELS.map((level, index) => (
                    <option key={index} value={index}>
                      {level[0]}
                    </option>
                  ))}
                </select>
                <label>Level</label>
              </div>
            </div>
          </li>
          <li className="active">
            <div className="collapsible-header">
              <i className="material-icons">beach_access</i>The Mission:
            </div>
            <div className="collapsible-body">{mission}</div>
          </li>
          <li>
            <div className="collapsible-header">
              <i className="material-icons">dashboard</i>Navigation
            </div>
            <div className="collapsible-body">
              <p>
                <i className="material-icons">arrow_back</i> - go left
              </p>
              <p>
                <i className="material-icons">arrow_forward</i> - go right
              </p>
              <p>
                <i className="material-icons">arrow_upward</i> - go up
              </p>

              <p>
                <i className="material-icons">arrow_downward</i> - go down
              </p>
              <p>
                <i className="material-icons">photo_camera</i> [Alt] - observe
              </p>
              <p>
                <i className="material-icons">publish</i> [Space] - pick an
                object
              </p>
              <p>
                <i className="material-icons">lock_open</i> [Enter] - open the
                door
              </p>
            </div>
          </li>
        </ul>
      </blockquote>
    </div>
  );
};

export default GridIntro;
