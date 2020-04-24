import React from "react";
import GridContainer from "./GridContainer";
import GridMessage from "./GridMessage";

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logMessage: "You can make a move! [right, left, up, down, space]",
    };

    this.handleLogMessage = this.handleLogMessage.bind(this);
  }

  handleLogMessage(msg) {
    this.setState({ logMessage: msg });
  }
  render() {
    return (
      <div className="row">
        <GridContainer handleMessage={this.handleLogMessage} />
        <GridMessage log={this.state.logMessage} />
      </div>
    );
  }
}

export default Playground;
