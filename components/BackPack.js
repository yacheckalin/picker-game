import React from "react";
import styled from "styled-components";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  background-color: ${(prop) => prop.color};
`;

const BackPack = ({ data, cellSize }) => {
  return (
    <table>
      <tbody>
        {data.map((el, index) => (
          <tr key={index}>
            <StyledCell
              width={cellSize}
              height={cellSize}
              className="green center stack-key"
            >
              {el === 2 && <i className="material-icons">vpn_key</i>}
            </StyledCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BackPack;
