import React from "react";
import styled from "styled-components";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
`;

const GridRow = React.memo(({ data, cellSize }) => (
  <tr>
    {data.map((col, index) => (
      <StyledCell key={index} width={cellSize} height={cellSize}>
        &nbsp;
      </StyledCell>
    ))}
  </tr>
));

export default GridRow;
