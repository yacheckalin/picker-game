import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  background-color: ${(prop) => prop.color};
`;

const Grid = ({ data, cellSize }) => (
  <table className="centered grid">
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {row.map((col, index) => (
            <StyledCell
              className={col == 8 ? "light-green lighten-4" : ""}
              key={index}
              width={cellSize}
              height={cellSize}
            >
              &nbsp;
            </StyledCell>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

Grid.propTypes = {
  data: PropTypes.array.isRequired,
  cellSize: PropTypes.number.isRequired,
};

export default Grid;
