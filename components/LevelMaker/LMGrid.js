import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { DEFAULT_CELL_SIZE } from "./constants";

const StyledColumn = styled.div`
  margin: 0px;
  padding: 0px;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  border: 1px solid red;
  display: inline-flexbox;
`;

const StyledRow = styled.div`
  margin: 0px;
  padding: 0px;
`;
const LMGrid = ({ data, size }) => {
  const containerRef = useRef();

  const [cellWidth, setCellWidth] = useState(DEFAULT_CELL_SIZE);
  const [cellHeight, setCellHeight] = useState(DEFAULT_CELL_SIZE);
  useEffect(() => {
    const { offsetWidth } = containerRef.current;
    const cellSize = Math.floor(parseInt(offsetWidth) / size) - 1;

    setCellHeight(cellSize);
    setCellWidth(cellSize);
  }, [cellWidth, cellHeight]);

  return (
    <div className="row" ref={containerRef}>
      <div className="col s12 ">
        {data.map((row, y) => (
          <StyledRow key={y} className="row">
            {row.map((col, x) => (
              <StyledColumn width={cellWidth} height={cellHeight} key={x}>
                &nbsp;
              </StyledColumn>
            ))}
          </StyledRow>
        ))}
      </div>
    </div>
  );
};

LMGrid.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
};

export default LMGrid;
