import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import { DEFAULT_CELL_SIZE, MARK_SELECTED } from "./constants";
import LMGridTools from "./LMGridTools";

import shortid from "shortid";

const StyledColumn = styled.div`
  margin: 0px;
  padding: 0px;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  border: 1px solid #ffccbc;
  display: inline-flexbox;

  /* :hover {
    background-color: #ffccbc;
  } */
  input {
    display: none;
  }
  input:checked + label {
    background-color: blue;
  }
  label {
    display: block;
    width: 100%;
    height: 100%;
    background-color: green;
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

const LMGrid = ({ data, size }) => {
  const containerRef = useRef();

  const [cellWidth, setCellWidth] = useState(DEFAULT_CELL_SIZE);
  const [cellHeight, setCellHeight] = useState(DEFAULT_CELL_SIZE);
  const [cellTop, setCellTop] = useState(0);
  const [cellLeft, setCellLeft] = useState(0);
  const [openTool, setOpenTool] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const [isMultipleSelect, setIsMultipleSelect] = useState(false);

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
  };

  const keypressHandler = (e) => {
    console.log(e.key);
    if (e.key == "Enter") {
      // check if there more then one cell selected

      let selectedCells = [];
      for (const row of data) {
        for (const col of row) {
          if (col === MARK_SELECTED) {
            selectedCells.push(col);
          }
        }
      }
      setIsMultipleSelect(!!selectedCells.length);
      setOpenTool(true);
    }
  };
  useEffect(() => {
    window.addEventListener("keypress", keypressHandler);
    return () => {
      window.removeEventListener("keypress", keypressHandler);
    };
  });

  return (
    <StyledContainer className="row" ref={containerRef}>
      <div className="col s12 ">
        {data.map((row, y) => (
          <StyledRow key={y} className="row">
            {row.map((col, x) => (
              <StyledColumn
                width={cellWidth}
                height={cellHeight}
                key={x}
                onClick={handleContextMenuCoordinates}
              >
                <input type="checkbox" id={`lm-grid-cell-${y}-${x}`} />
                <label htmlFor={`lm-grid-cell-${y}-${x}`}>&nbsp;</label>
              </StyledColumn>
            ))}
          </StyledRow>
        ))}

        <LMGridTools
          open={openTool}
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          cellSize={size}
          parentTop={cellTop}
          parentLeft={cellLeft}
          gridWidth={gridWidth}
          key={shortid.generate()}
          multipleMode={isMultipleSelect}
        />
      </div>
    </StyledContainer>
  );
};

LMGrid.propTypes = {
  data: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
};

export default LMGrid;
