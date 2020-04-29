import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import styled from "styled-components";

import {
  DEFAULT_CELL_SIZE,
  MARK_SELECTED,
  MARK_CLEAR,
  KEYS,
  DOORS,
  WALL,
  WALL_D,
  EMPTY,
} from "../../constants";

import { mapIconColor } from "../../helpers";

import LMGridTools from "./LMGridTools";

import shortid from "shortid";
import LMGridObjectIcon from "./LMGridObjectIcon";
const StyledColumn = styled.div`
  margin: 0px;
  padding: 0px;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  border: 1px solid #bdbdbd;
  display: inline-flexbox;

  label:hover {
    background-color: #ffccbc !important;
    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -ms-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    opacity: 0.5;
  }

  input {
    display: none;
  }
  input:checked + label {
    background-color: #90caf9;
  }
  label {
    display: block;
    width: 100%;
    height: 100%;
    background-color: #c5e1a5;

    -webkit-transition: opacity 1s ease-in-out;
    -moz-transition: opacity 1s ease-in-out;
    -ms-transition: opacity 1s ease-in-out;
    -o-transition: opacity 1s ease-in-out;
    transition: opacity 1s ease-in-out;
    opacity: 1;
  }
`;

const StyledRow = styled.div`
  margin: 0px;
  padding: 0px;
`;

const StyledContainer = styled.div`
  position: relative;
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
  const [gridData, setGridData] = useState(data);

  useEffect(() => {
    const { offsetWidth } = containerRef.current;
    const cellSize = Math.floor(parseInt(offsetWidth) / size) - 1;

    setGridWidth(offsetWidth);
    setCellHeight(cellSize);
    setCellWidth(cellSize);
  }, [cellWidth, cellHeight, gridWidth]);

  const handleGridMarking = (e) => {
    const { offsetTop, offsetLeft } = e.target;

    setCellTop(offsetTop);
    setCellLeft(offsetLeft);
    setOpenTool(false);

    const tmp = e.target.id.split("-");
    if (tmp) {
      const [y, x] = tmp.splice(-2, 2);

      if (x >= 0 && y >= 0) {
        gridData[y][x] = e.target.checked ? MARK_SELECTED : MARK_CLEAR;
        setGridData(gridData);
      }
    }
  };

  const mapObjectTagWithKey = (tag) => {
    if (KEYS[tag]) return KEYS[tag];
    if (DOORS[tag]) return DOORS[tag];
    if (tag === "WALL") return WALL;
    if (tag === "WALL_D") return WALL_D;
  };

  const handleInsert = ({ key }) => {
    for (let i = 0; i < gridData.length; i++) {
      for (let j = 0; j < gridData[i].length; j++) {
        if (gridData[i][j] === MARK_SELECTED) {
          gridData[i][j] = mapObjectTagWithKey(key);
        }
      }
    }

    setGridData(gridData);
    setOpenTool(false);
  };

  const keypressHandler = (e) => {
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
      setIsMultipleSelect(selectedCells.length > 1 ? true : false);
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
        {gridData.map((row, y) => (
          <StyledRow key={y} className="row">
            {row.map((col, x) => (
              <StyledColumn
                width={cellWidth}
                height={cellHeight}
                key={x}
                onClick={handleGridMarking}
                id={`lm-grid-cell-${y}-${x}`}
                className="generated-grid-cell"
              >
                <input type="checkbox" id={`lm-grid-cell-input-${y}-${x}`} />
                <label
                  htmlFor={`lm-grid-cell-input-${y}-${x}`}
                  className={`${mapIconColor(col)}`}
                ></label>
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
          handleInsert={handleInsert}
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
