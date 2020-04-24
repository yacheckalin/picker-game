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
    <blockquote>
      <p>The mission is to find the EXIT!</p>
      <p>
        <i className="material-icons">arrow_back</i> - go left
      </p>
      <p>
        <i className="material-icons">arrow_forward</i> - go right
      </p>
      <p>
        <i className="material-icons">arrow_upward</i> - go up
      </p>
      <p>
        <i className="material-icons">arrow_downward</i> - go down
      </p>
      <p>
        <i className="material-icons">arrow_downward</i> - go down
      </p>
      <p>
        <i className="material-icons">photo_camera</i> [Alt] - observe
      </p>
      <p>
        <i className="material-icons">publish</i> [Space] - pick an object
      </p>
      <p>
        <i className="material-icons">lock_open</i> [Enter] - open the door
      </p>
    </blockquote>
  </div>
));
