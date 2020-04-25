import React from "react";
import styled from "styled-components";

import { KEYS } from "../constants";
import { stuffColorPicker } from "../helpers";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  background-color: ${(prop) => prop.color};
`;

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
                <i className={`material-icons ${stuffColorPicker(el)}`}>
                  vpn_key
                </i>
              )}
            </StyledCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BackPack;
