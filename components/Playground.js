import React from "react";
import GridContainer from "./GridContainer";
import GridMessage from "./GridMessage";
import GridIntro from "./GridIntro";

import { KEYS, DOORS, WALL, VISITED } from "../constants";

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logMessage:
        "You can make a move! [right, left, up, down, space, alt, enter]",
      grid: [
        [VISITED, 0, WALL, WALL, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, KEYS.RED_KEY, 1],
        [1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, KEYS.BLUE_KEY, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1],
        [1, KEYS.GREEN_KEY, 1, 0, 0, 0, 0, DOORS.BLUE_DOOR],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      gridHash: "level_default",
    };
    this.handleLoadLevel = this.handleLoadLevel.bind(this);
    this.handleLogMessage = this.handleLogMessage.bind(this);
  }

  handleLogMessage(msg) {
    this.setState({ logMessage: msg });
  }
  handleLoadLevel([gridHash, grid]) {
    this.setState({ grid });
    this.setState({ gridHash });
  }
  render() {
    return (
      <div className="row">
        <GridIntro loadHandler={this.handleLoadLevel} />

        <GridContainer
          handleMessage={this.handleLogMessage}
          mapper={this.state.grid}
          key={this.state.gridHash}
        />
        <GridMessage log={this.state.logMessage} />
      </div>
    );
  }
}

export default Playground;
