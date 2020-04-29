import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import LMGridObjectIcon from "./LMGridObjectIcon";
import { KEYS, DOORS, WALL, WALL_D } from "../../constants";

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

  .collection a span {
    width: 20px;
    height: 20px;
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
  multipleMode,
  handleInsert,
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

  const handleAction = (e) => {
    const { key } = e.target.dataset;
    handleInsert({ key });
  };

  return (
    open && (
      <StyledContextBlock
        top={topOffset}
        left={leftOffset}
        ref={gridToolContextMenuRef}
        id="grid-tool-context-container"
      >
        <div className="collection">
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="GREEN_KEY"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={KEYS.GREEN_KEY} className={"left"} />
            Green Key
            <span className="secondary-content green">&nbsp;</span>
          </a>
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="RED_KEY"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={KEYS.RED_KEY} className={"left"} />
            Red Key
            <span className="secondary-content red">&nbsp;</span>
          </a>
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="BLUE_KEY"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={KEYS.BLUE_KEY} className={"left"} />
            Blue Key
            <span className="secondary-content blue">&nbsp;</span>
          </a>
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="BLUE_DOOR"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={DOORS.BLUE_DOOR} className={"left"} /> Blue
            Door
            <span className="secondary-content blue darken-3">&nbsp;</span>
          </a>
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="RED_DOOR"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={DOORS.RED_DOOR} className={"left"} />
            Red Door
            <span className="secondary-content red darken-3">&nbsp;</span>
          </a>
          <a
            className={`collection-item btn ${multipleMode && `disabled`}`}
            data-key="GREEN_DOOR"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={DOORS.GREEN_DOOR} className={"left"} />
            Green Door
            <span className="secondary-content green darken-3">&nbsp;</span>
          </a>
          <a
            className="collection-item btn"
            data-key="WALL"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={WALL} className={`left`} />
            Wall
            <span className="secondary-content indigo">&nbsp;</span>
          </a>
          <a
            className="collection-item btn"
            data-key="WALL_D"
            onClick={handleAction}
          >
            <LMGridObjectIcon tag={WALL_D} className={`left`} />
            Wall Near Door
            <span className="secondary-content indigo lighten-3">&nbsp;</span>
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
  handleInsert: PropTypes.func.isRequired,
};

export default LMGridTools;
