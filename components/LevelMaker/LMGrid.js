import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { DEFAULT_CELL_SIZE } from "./constants";
import LMGridTools from "./LMGridTools";

import shortid from "shortid";

const StyledColumn = styled.div`
  margin: 0px;
  padding: 0px;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  border: 1px solid red;
  display: inline-flexbox;

  :hover {
    background-color: #ffccbc;
  }
`;

const StyledRow = styled.div`
  margin: 0px;
  padding: 0px;
`;

const StyledContainer = styled.div`
  position: relative;
`;

const StyledContextBlock = styled.div`
  position: absolute;
`;

const LMGrid = React.memo(({ data, size }) => {
  const containerRef = useRef();

  const [cellWidth, setCellWidth] = useState(DEFAULT_CELL_SIZE);
  const [cellHeight, setCellHeight] = useState(DEFAULT_CELL_SIZE);
  const [cellTop, setCellTop] = useState(0);
  const [cellLeft, setCellLeft] = useState(0);
  const [openTool, setOpenTool] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    const { offsetWidth } = containerRef.current;
    const cellSize = Math.floor(parseInt(offsetWidth) / size) - 1;

    setGridWidth(offsetWidth);
    setCellHeight(cellSize);
    setCellWidth(cellSize);
  }, [cellWidth, cellHeight, gridWidth]);

  const handleContextMenuCoordinates = (e) => {
    const { offsetTop, offsetLeft } = e.target;

    setCellTop(offsetTop);
    setCellLeft(offsetLeft);
    setOpenTool(!openTool);
  };

  return (
    <StyledContainer className="row" ref={containerRef}>
      <div className="col s12 ">
        {data.map((row, y) => (
          <StyledRow key={shortid.generate()} className="row">
            {row.map((col, x) => (
              <StyledColumn
                width={cellWidth}
                height={cellHeight}
                key={shortid.generate()}
                id={`lm-grid-cell-${y}-${x}`}
                onClick={handleContextMenuCoordinates}
              >
                &nbsp;
              </StyledColumn>
            ))}
          </StyledRow>
        ))}
      </div>

      <LMGridTools
        open={openTool}
        cellWidth={cellWidth}
        cellHeight={cellHeight}
        cellSize={size}
        parentTop={cellTop}
        parentLeft={cellLeft}
        gridWidth={gridWidth}
        key={shortid.generate()}
      />
    </StyledContainer>
  );
});

LMGrid.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
};

export default LMGrid;
