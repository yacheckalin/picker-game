import React from "react";
import PropTypes from "prop-types";

const GridMessage = React.memo(({ log }) => (
  <div className="col s12 card-panel">
    <blockquote>{log}</blockquote>
  </div>
));

GridMessage.propTypes = {
  log: PropTypes.string.isRequired,
};

export default GridMessage;
