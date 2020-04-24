import React from "react";
import GridContainer from "./GridContainer";
import GridMessage from "./GridMessage";

class Playground extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      logMessage: "You can make a move! [right, left, up, down, space]",
      mission: "The mission is to find exit!",
    };

    this.handleLogMessage = this.handleLogMessage.bind(this);
  }

  handleLogMessage(msg) {
    this.setState({ logMessage: msg });
  }
  render() {
    return (
      <div className="row">
        <GridInfo>{this.state.mission}</GridInfo>
        <GridContainer handleMessage={this.handleLogMessage} />
        <GridMessage log={this.state.logMessage} />
      </div>
    );
  }
}

export default Playground;

const GridInfo = React.memo((props) => (
  <div className="col s12 card-panel lime lighten-4">
    <blockquote>{props.children}</blockquote>
  </div>
));
