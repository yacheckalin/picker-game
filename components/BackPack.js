import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { stuffColorPicker, isElementKey } from "../helpers";
import LMGridObjectIcon from "./LevelMaker/LMGridObjectIcon";

const StyledCell = styled.td`
  width: ${(prop) => prop.width}px;
  height: ${(prop) => prop.height}px;
  margin: 0px;
  background-color: ${(prop) => prop.color};
  font-size: 1.75em;

  i {
    font-size: 2em;
  }
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
              {isElementKey(el) && <LMGridObjectIcon tag={el} />}
            </StyledCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

BackPack.propTypes = {
  data: PropTypes.array,
  cellSize: PropTypes.number.isRequired,
};

export default BackPack;
