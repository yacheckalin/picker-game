import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const StyledContextBlock = styled.div`
  position: absolute;
  top: ${(prop) => prop.top}px;
  left: ${(prop) => prop.left}px;
  animation-name: grid-tool-show-up;
  animation-duration: 1.5s;

  @keyframes grid-tool-show-up {
    from {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }
`;

const LMGridTools = ({
  open,
  cellWidth,
  cellHeight,
  cellSize,
  parentTop,
  parentLeft,
  gridWidth,
}) => {
  const gridToolContextMenuRef = useRef();

  const [topOffset, setTopOffset] = useState(parentTop);
  const [leftOffset, setLeftOffset] = useState(parentLeft + cellWidth);
  const [toolWidth, setToolWidth] = useState(0);
  const [toolHeight, setToolHeight] = useState(0);

  useEffect(() => {
    const el = gridToolContextMenuRef.current;
    if (open) {
      setToolWidth(el.offsetWidth);
      setToolHeight(el.offsetHeight);
    }
  });

  return (
    open && (
      <StyledContextBlock
        top={topOffset}
        left={leftOffset}
        ref={gridToolContextMenuRef}
        id="grid-tool-context-container"
      >
        <div className="collection">
          <a className="collection-item">
            <i className="material-icons left green-text text-darken-2">
              vpn_key
            </i>
            Green Key
          </a>
          <a className="collection-item">
            <i className="material-icons left  red-text text-darken-2">
              vpn_key
            </i>
            Red Key
          </a>
          <a className="collection-item">
            <i className="material-icons left  blue-text text-darken-2">
              vpn_key
            </i>
            Blue Key
          </a>
          <a className="collection-item">
            <i className="material-icons left  blue-text text-darken-2">home</i>
            Blue Door
          </a>
          <a className="collection-item">
            <i className="material-icons left  red-text text-darken-2">
              lock_outline
            </i>
            Red Door
          </a>
          <a className="collection-item">
            <i className="material-icons left  green-text text-darken-2">
              lock_outline
            </i>
            Green Door
          </a>
          <a className="collection-item">
            <i className="material-icons left  blue-text text-darken-2">stop</i>
            Wall
          </a>
        </div>
      </StyledContextBlock>
    )
  );
};

LMGridTools.propTypes = {
  open: PropTypes.bool.isRequired,
  cellWidth: PropTypes.number.isRequired,
  cellHeight: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  parentTop: PropTypes.number.isRequired, // child top offset
  parentLeft: PropTypes.number.isRequired, // child left offset
  gridWidth: PropTypes.number.isRequired,
};

export default LMGridTools;
