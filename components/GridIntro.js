import React, { useEffect } from "react";

const GridIntro = React.memo((props) => {
  useEffect(() => {
    const callback = function () {
      const elems = document.querySelectorAll(".collapsible");
      M.Collapsible.init(elems, {});
    };
    document.addEventListener("DOMContentLoaded", callback);
    return () => {
      document.removeEventListener("DOMContentLoaded", callback);
    };
  });
  return (
    <div className="col s12 card-panel lime lighten-4">
      <blockquote>
        <ul className="collapsible">
          <li className="active">
            <div className="collapsible-header">
              <i className="material-icons">beach_access</i>The Mission:
            </div>
            <div className="collapsible-body">
              The mission is to find the exit from the room!
            </div>
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
});

export default GridIntro;
