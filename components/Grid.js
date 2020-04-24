import React from "react";
import GridRow from "./GridRow";

const Grid = React.memo(({ data, cellSize }) => (
  <table className="centered grid">
    <tbody>
      {data.map((row, index) => (
        <GridRow key={index} data={row} cellSize={cellSize} />
      ))}
    </tbody>
  </table>
));

export default Grid;
