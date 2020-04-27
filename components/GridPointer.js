import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";

const StyledPointer = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.width}px;
  background-color: yellowgreen;
  height: ${(props) => props.height}px;
  position: absolute;
  top: ${(prop) => prop.top}px;
  left: ${(prop) => prop.left}px;
  opacity: 0.5;

  i {
    width: ${(props) => props.width}px;
    font-size: 2em;
  }
`;

const GridPointer = ({ width, height, top, left }) => (
  <>
    <StyledPointer
      width={width}
      height={height}
      left={left}
      top={top}
      className="valign-wrapper"
    >
      <i className="material-icons center-align">flare</i>
    </StyledPointer>
  </>
);

GridPointer.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  left: PropTypes.number.isRequired,
};

export default GridPointer;
