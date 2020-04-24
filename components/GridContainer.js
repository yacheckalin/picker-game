import React from "react";
import styled from "styled-components";
import Grid from "./Grid";

const Pointer = styled.div`
  width: ${(props) => props.width}px;
  background-color: yellowgreen;
  height: ${(props) => props.height}px;
  position: absolute;
  top: ${(prop) => prop.top}px;
  left: ${(prop) => prop.left}px;
  opacity: 0.5;
`;

class GridContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.recalculateCellSize = this.recalculateCellSize.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.checkPointer = this.checkPointer.bind(this);
    this.openDoor = this.openDoor.bind(this);
    this.pick = this.pick.bind(this);

    this.state = {
      containerWidth: 0,
      cellSize: 0,
      pointerX: 0,
      pointerY: 0,
      pointerColIndex: 0,
      pointerRowIndex: 0,
      gridMap: [
        [0, 0, 1, 1, 1, 1, 1, 1],
        [1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 2, 1],
        [1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 9],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ],
      gridSize: 8,
      backpack: [],
    };
  }

  openDoor() {
    const {
      pointerColIndex: y,
      pointerRowIndex: x,
      backpack,
      gridMap,
    } = this.state;

    if (gridMap[x][y] == 9) {
      if (backpack.includes(2)) {
        this.props.handleMessage(`You've found exit! You WIN!`);
      } else {
        this.props.handleMessage(`You don't have a key in your BAG!`);
      }
    } else {
      this.props.handleMessage("There is no door!");
    }
  }

  pick() {
    const { pointerColIndex: y, pointerRowIndex: x, gridMap } = this.state;
    if (gridMap[x][y] == 2) {
      gridMap[x][y] = 8; // mark as visited
      let backpack = this.state.backpack.concat(2);
      this.setState({ backpack });
      this.setState({ gridMap });
      this.props.handleMessage(`You've picked a KEY!`);
    } else {
      this.props.handleMessage(`There is nothing to pick up!`);
    }
  }

  checkPointer({ pointerColIndex: y, pointerRowIndex: x }) {
    console.log(`x: ${x}, y: ${y}`);
    const { gridMap } = this.state;
    if (
      gridMap[x] !== undefined &&
      gridMap[x][y] !== undefined &&
      gridMap[x][y] != 1
    ) {
      // mark as already visited if it's not a KEY or EXIT
      if (gridMap[x][y] != 9 && gridMap[x][y] != 2) {
        gridMap[x][y] = 8;
      }
      this.setState({ gridMap });
      this.setState({ pointerRowIndex: x, pointerColIndex: y });
      return true;
    }
    return false;
  }

  moveRight() {
    const { pointerX, cellSize, pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex,
        pointerColIndex: pointerColIndex + 1,
      })
    ) {
      this.setState({ pointerX: pointerX + cellSize });
    } else {
      this.props.handleMessage(`You can't move there`);
    }
  }

  moveLeft() {
    const { pointerX, cellSize, pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex,
        pointerColIndex: pointerColIndex - 1,
      })
    ) {
      this.setState({ pointerX: pointerX - cellSize });
    } else {
      this.props.handleMessage(`You can't move there`);
    }
  }

  moveUp() {
    const { pointerY, cellSize, pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex: pointerRowIndex - 1,
        pointerColIndex,
      })
    ) {
      this.setState({ pointerY: pointerY - cellSize });
    } else {
      this.props.handleMessage(`You can't move there`);
    }
  }
  moveDown() {
    const { pointerY, cellSize, pointerColIndex, pointerRowIndex } = this.state;

    if (
      this.checkPointer({
        pointerColIndex,
        pointerRowIndex: pointerRowIndex + 1,
      })
    ) {
      this.setState({ pointerY: pointerY + cellSize });
    } else {
      this.props.handleMessage(`You can't move there`);
    }
  }

  handleOnKeyDown(e) {
    const { handleMessage } = this.props;
    const { key } = e;
    switch (key) {
      case "ArrowUp":
        handleMessage("goes up!");
        this.moveUp();
        e.preventDefault();
        break;
      case "ArrowDown":
        handleMessage("goes down!");
        this.moveDown();
        e.preventDefault();
        break;
      case "ArrowRight":
        handleMessage("goes right!");
        this.moveRight();
        e.preventDefault();
        break;
      case "ArrowLeft":
        handleMessage("goes left!");
        this.moveLeft();
        e.preventDefault();
        break;
      case " ":
        this.pick();
        e.preventDefault();
        break;
      case "Enter":
        this.openDoor();
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
      cellSize: Math.floor(containerWidth / this.state.gridSize),
    });
  }
  render() {
    const { gridMap } = this.state;
    return (
      <div className="col s12 blue grid-container" id="grid-container">
        <Grid data={gridMap} cellSize={this.state.cellSize} />

        <Pointer
          width={this.state.cellSize}
          height={this.state.cellSize}
          left={this.state.pointerX}
          top={this.state.pointerY}
          onClick={(e) => alert("clicked")}
        />
      </div>
    );
  }
}

export default GridContainer;
