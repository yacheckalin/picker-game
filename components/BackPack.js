import React from "react";
import styled from "styled-components";

import { KEYS } from "../constants";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  background-color: ${(prop) => prop.color};
`;

const colorPicker = (key) => {
  switch (key) {
    case KEYS.BLUE_KEY:
      return "blue-text text-darken-4";
    case KEYS.GREEN_KEY:
      return "green-text text-darken-4";
    case KEYS.RED_KEY:
      return "red-text text-darken-4";
  }
};

const BackPack = ({ data, cellSize }) => {
  const keyCheck = (key) => {
    for (const [k, v] of Object.entries(KEYS)) {
      if (v === key) return true;
    }
    return false;
  };
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
              {keyCheck(el) && (
                <i className={`material-icons ${colorPicker(el)}`}>vpn_key</i>
              )}
            </StyledCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BackPack;
