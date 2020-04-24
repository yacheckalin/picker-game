import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import GridModal from "./GridModal";
import BackPack from "./BackPack";

import { KEYS, DOORS, WALL, VISITED, EMPTY } from "../constants";

const StyledPointer = styled.div`
  width: ${(props) => props.width}px;
  background-color: yellowgreen;
  height: ${(props) => props.height}px;
  position: absolute;
  top: ${(prop) => prop.top}px;
  left: ${(prop) => prop.left}px;
  opacity: 0.5;

  i {
    width: ${(props) => props.width}px;
  }
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
    this.observe = this.observe.bind(this);

    this.state = {
      containerWidth: 0,
      cellSize: 0,
      pointerX: 0,
      pointerY: 0,
      pointerColIndex: 0,
      pointerRowIndex: 0,
      gridMap: this.props.mapper,
      gridSize: this.props.size,
      backpack: [0, 0, 0, 0, 0, 0, 0, 0],
      backPackSize: 8,
      levelPassed: false,
    };
  }

  observe() {
    const { pointerColIndex: y, pointerRowIndex: x, gridMap } = this.state;

    switch (gridMap[x][y]) {
      case DOORS.GREEN_DOOR:
        this.props.handleMessage(
          `You've found the ${DOORS.GREEN_DOOR[1]} door!`
        );
        break;
      case DOORS.RED_DOOR:
        this.props.handleMessage(`You've found the ${DOORS.RED_DOOR[1]} door!`);
        break;
      case DOORS.BLUE_DOOR:
        this.props.handleMessage(
          `You've found the ${DOORS.BLUE_DOOR[1]} door!`
        );
        break;
      case KEYS.GREEN_KEY:
        this.props.handleMessage(
          `There is a ${KEYS.GREEN_KEY[1]} key, do you wanna pick it up?`
        );
        break;
      case KEYS.RED_KEY:
        this.props.handleMessage(
          `There is a ${KEYS.RED_KEY[1]} key, do you wanna pick it up?`
        );
        break;
      case KEYS.BLUE_KEY:
        this.props.handleMessage(
          `There is a ${KEYS.BLUE_KEY[1]} key, do you wanna pick it up?`
        );
        break;
      case WALL:
        this.props.handleMessage(`There is a WALL`);
        break;
      case EMPTY:
      case VISITED:
        this.props.handleMessage(`Just an empty space`);
        break;
      default:
        this.props.handleMessage(
          `I don't know where I am, and what I'm doing here!`
        );
    }
  }
  openDoor() {
    const {
      pointerColIndex: y,
      pointerRowIndex: x,
      backpack,
      gridMap,
    } = this.state;

    if (gridMap[x][y] == DOORS.BLUE_DOOR) {
      if (backpack.includes(KEYS.BLUE_KEY)) {
        this.props.handleMessage(`You've found exit! You WIN!`);
        this.setState({ levelPassed: true });
      } else {
        this.props.handleMessage(`You don't have the right KEY in your BAG!`);
      }
    } else {
      this.props.handleMessage("There is no door!");
    }
  }

  pick() {
    const { pointerColIndex: y, pointerRowIndex: x, gridMap } = this.state;

    if (Object.values(KEYS).includes(gridMap[x][y])) {
      let firstZeroIndex = this.state.backpack.findIndex((item) => !item);
      const backpack = Array.from(this.state.backpack);
      backpack[firstZeroIndex] = gridMap[x][y];
      const oldValue = gridMap[x][y];
      gridMap[x][y] = VISITED; // mark as visited

      this.setState({ backpack });
      this.setState({ gridMap });

      this.props.handleMessage(`You've picked a ${oldValue[1]} KEY!`);
    } else {
      this.props.handleMessage(`There is nothing to pick up!`);
    }
  }

  checkPointer({ pointerColIndex: y, pointerRowIndex: x }) {
    const { gridMap } = this.state;
    if (
      gridMap[x] !== undefined &&
      gridMap[x][y] !== undefined &&
      gridMap[x][y] != WALL
    ) {
      // mark as already visited if it's not a KEY or EXIT
      if (
        !Object.values(DOORS).includes(gridMap[x][y]) &&
        !Object.values(KEYS).includes(gridMap[x][y])
      ) {
        gridMap[x][y] = VISITED;
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
      this.props.handleMessage(`You steped to the right!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
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
      this.props.handleMessage(`You steped to the left!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
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
      this.props.handleMessage(`You steped up!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
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
      this.props.handleMessage(`You steped down!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
    }
  }

  handleOnKeyDown(e) {
    const { key } = e;
    switch (key) {
      case "ArrowUp":
        this.moveUp();
        e.preventDefault();
        break;
      case "ArrowDown":
        this.moveDown();
        e.preventDefault();
        break;
      case "ArrowRight":
        this.moveRight();
        e.preventDefault();
        break;
      case "ArrowLeft":
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
      case "Alt":
        this.observe();
        e.preventDefault();
        break;
      default:
        this.props.handleMessage(`I don't know what to do ....`);
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
      console.log(`container-widht: ${containerWidth}, grid-size: ${this.state.gridSize}, cell-size: ${Math.floor(containerWidth / this.state.gridSize)}`)
    this.setState({
      containerWidth,
      cellSize: Math.floor(containerWidth / this.state.gridSize),
    });
  }
  render() {
    const { gridMap, backpack } = this.state;

    return (
      <>
        <div className="col s10 blue grid-container" id="grid-container">
          <Grid data={gridMap} cellSize={this.state.cellSize} />

          <StyledPointer
            width={this.state.cellSize}
            height={this.state.cellSize}
            left={this.state.pointerX}
            top={this.state.pointerY}
            className="valign-wrapper"
          >
            <i className="material-icons center-align">flare</i>
          </StyledPointer>
          {this.state.levelPassed && (
            <GridModal message={"Congratulations you win!!!"} win={true} />
          )}
        </div>
        <div className="col s2 backpack-container">
          <BackPack data={backpack} cellSize={this.state.cellSize} />
        </div>
      </>
    );
  }
}

export default GridContainer;
