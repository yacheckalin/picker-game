import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCell = styled.div`
  margin: 0px;
  padding: 0px;
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  background-color: ${(prop) => prop.color};
  display: inline-flexbox;
  position: relative;
`;

const StyledRow = styled.div`
  margin: 0px;
  padding: 0px;
`;

const Grid = ({ data, cellSize, recalculate }) => {
  useEffect(() => {
    // calculate the pointer height, width size from the first element on a grid
    const el = document.getElementById("#grid-cell-0-0");
    let offsetHeight, offsetWidth;
    if (el) {
      offsetHeight = el.offsetHeight;
      offsetWidth = el.offsetWidth;
    } else {
      offsetHeight = 0;
      offsetWidth = 0;
    }
    recalculate({ pointerWidth: offsetWidth, pointerHeight: offsetHeight });
  });
  return (
    <div>
      {data.map((row, y) => (
        <StyledRow key={y}>
          {row.map((col, x) => (
            <StyledCell
              className={`grid-cell ${
                col == 8 ? "light-green lighten-4" : "blue"
              }`}
              key={x}
              width={cellSize}
              height={cellSize}
              id={`#grid-cell-${y}-${x}`}
            >
              &nbsp;
            </StyledCell>
          ))}
        </StyledRow>
      ))}
    </div>
  );
};

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  cellSize: PropTypes.number.isRequired,
  recalculate: PropTypes.func,
};

export default Grid;
