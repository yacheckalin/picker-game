import React from "react";
import PropTypes from "prop-types";

import styled from "styled-components";
import { renderIconMapper } from "../../helpers";

const StyledIcon = styled.i`
  font-size: 2em;
`;

const LMGridObjectIcon = ({ tag, className = "" }) => {
  const { color, name } = renderIconMapper(tag);

  return (
    <StyledIcon
      className={`material-icons text-darken-2 ${color} ${className}`}
    >
      {name}
    </StyledIcon>
  );
};

LMGridObjectIcon.defaultProps = {
  className: "",
};

export default LMGridObjectIcon;
