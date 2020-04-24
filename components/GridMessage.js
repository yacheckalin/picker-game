import React from "react";

const GridMessage = React.memo(({ log }) => (
  <div className="col s12 card-panel">
    <blockquote>{log}</blockquote>
  </div>
));

export default GridMessage;
