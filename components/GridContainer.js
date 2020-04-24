import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Pointer = styled.div`
  width: ${(props) => props.width}px;
  background-color: yellowgreen;
  height: ${(props) => props.height}px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
`;

class GridContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { containerWidth: 0, cellSize: 0 };
    this.recalculateCellSize = this.recalculateCellSize.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  handleOnKeyDown(e) {
    const { handleMessage } = this.props;
    const { key } = e;
    switch (key) {
      case "ArrowUp":
        console.log("goes up!");
        handleMessage("goes up!");
        e.preventDefault();
        break;
      case "ArrowDown":
        console.log("goes down!");
        handleMessage("goes down!");

        e.preventDefault();
        break;
      case "ArrowRight":
        console.log("goes right!");
        handleMessage("goes right!");

        e.preventDefault();
        break;
      case "ArrowLeft":
        console.log("goes left!");
        handleMessage("goes left!");

        e.preventDefault();
        break;
      case " ":
        console.log("pick an object!");
        handleMessage("pick an object!");

        e.preventDefault();
        break;
      default:
        console.log(e.key);
        break;
    }
  }

  componentDidMount() {
    this.recalculateCellSize();
    window.addEventListener("resize", this.recalculateCellSize);
    window.addEventListener("keydown", this.handleOnKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recalculateCellSize);
    window.removeEventListener("keydown", this.handleOnKeyDown);
  }
  recalculateCellSize() {
    const containerWidth = document.getElementById("grid-container")
      .clientWidth;
    this.setState({
      containerWidth,
      cellSize: Math.floor(containerWidth / this.props.gridSize),
    });
  }
  render() {
    const { gridMap } = this.props;
    return (
      <div className="col s12 blue grid-container" id="grid-container">
        <Grid data={gridMap} cellSize={this.state.cellSize} />
        <Pointer
          width={this.state.cellSize}
          height={this.state.cellSize}
          left={0}
          top={0}
          onClick={(e) => alert("clicked")}
        />
      </div>
    );
  }
}

export default GridContainer;
