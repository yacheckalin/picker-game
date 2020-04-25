import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types';

import { KEYS } from "../constants";
import { stuffColorPicker, isElementKey } from "../helpers";

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
              {isElementKey(el) && (
                <i
                  className={`material-icons  text-darken-4 ${stuffColorPicker(
                    el
                  )}-text`}
                >
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

BackPack.propTypes = {
  data: PropTypes.array,
  cellSize: PropTypes.number.isRequired
}

export default BackPack;
