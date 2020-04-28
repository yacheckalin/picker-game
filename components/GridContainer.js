import React from "react";
import styled from "styled-components";
import Grid from "./Grid";
import GridModal from "./GridModal";
import BackPack from "./BackPack";
import GridPointer from "./GridPointer";

import PropTypes from "prop-types";

import {
  KEYS,
  DOORS,
  WALL,
  VISITED,
  EMPTY,
  WALL_D,
  EMPTY_BACKPACK_CELL,
} from "../constants";

import { isElementDoor, isElementKey, isInABackPack } from "../helpers";

class GridContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.recalculateCellSize = this.recalculateCellSize.bind(this);
    this.recalculatePointerSize = this.recalculatePointerSize.bind(this);
    this.calculatePointerOffset = this.calculatePointerOffset.bind(this);
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
      pointerWidth: 0,
      pointerHeight: 0,
      borderSize: 1,
      gridMap: this.props.mapper,
      gridSize: this.props.size,
      backpack: new Array(this.props.size).fill(0),
      levelPassed: false,
    };
  }

  observe() {
    const { pointerColIndex: y, pointerRowIndex: x, gridMap } = this.state;

    const compare = (array1, array2) =>
      array1.length === array2.length &&
      array1.every((value, index) => value === array2[index]);

    if (Array.isArray(gridMap[x][y])) {
      if (compare(gridMap[x][y], DOORS.GREEN_DOOR)) {
        this.props.handleMessage(
          `You've found the ${DOORS.GREEN_DOOR[1]} door!`
        );
      }
      if (compare(gridMap[x][y], DOORS.RED_DOOR)) {
        this.props.handleMessage(`You've found the ${DOORS.RED_DOOR[1]} door!`);
      }
      if (compare(gridMap[x][y], DOORS.BLUE_DOOR)) {
        this.props.handleMessage(
          `You've found the ${DOORS.BLUE_DOOR[1]} door!`
        );
      }

      if (compare(gridMap[x][y], KEYS.BLUE_KEY)) {
        this.props.handleMessage(
          `There is a ${KEYS.BLUE_KEY[1]} key, do you wanna pick it up?`
        );
      }
      if (compare(gridMap[x][y], KEYS.GREEN_KEY)) {
        this.props.handleMessage(
          `There is a ${KEYS.GREEN_KEY[1]} key, do you wanna pick it up?`
        );
      }
      if (compare(gridMap[x][y], KEYS.RED_KEY)) {
        this.props.handleMessage(
          `There is a ${KEYS.RED_KEY[1]} key, do you wanna pick it up?`
        );
      }
    } else {
      if (gridMap[x][y] === VISITED || gridMap[x][y] === EMPTY) {
        this.props.handleMessage(`Just an empty space`);
      }
    }
  }
  openDoor() {
    const {
      pointerColIndex: y,
      pointerRowIndex: x,
      backpack,
      gridMap,
    } = this.state;

    const keyToDoorMapper = ([doorIndex, doorTag]) => {
      switch (doorTag) {
        case "GREEN":
          return KEYS.GREEN_KEY;
        case "BLUE":
          return KEYS.BLUE_KEY;
        case "RED":
          return KEYS.RED_KEY;
      }
    };

    const isExit = ([doorIndex, doorTag]) =>
      doorIndex === DOORS.BLUE_DOOR[0] && doorTag === DOORS.BLUE_DOOR[1];
    const breakWalls = (grid, x, y) => {
      if (grid[x + 1] !== undefined && grid[x + 1][y] == WALL_D)
        gridMap[x + 1][y] = VISITED;
      if (grid[x - 1] !== undefined && grid[x - 1][y] == WALL_D)
        gridMap[x - 1][y] = VISITED;
      if (grid[x][y + 1] !== undefined && grid[x][y + 1] == WALL_D)
        gridMap[x][y + 1] = VISITED;
      if (grid[x][y - 1] !== undefined && grid[x][y - 1] == WALL_D)
        gridMap[x][y - 1] = VISITED;
    };

    const useKey = (backpack, key) =>
      (backpack[
        backpack.findIndex((item) => item == key)
      ] = EMPTY_BACKPACK_CELL);

    if (isElementDoor(gridMap[x][y])) {
      // is there a right key in a backpack
      if (isInABackPack(backpack, gridMap[x][y])) {
        // if BLUE_DOOR then win
        if (isExit(gridMap[x][y])) {
          this.props.handleMessage(`You've found exit! You WIN!`);
          this.setState({ levelPassed: true });
        } else {
          // mark as visited
          breakWalls(gridMap, x, y);
          // remove key from backpack
          useKey(backpack, keyToDoorMapper(gridMap[x][y]));
          gridMap[x][y] = VISITED;

          this.setState({ gridMap });
          this.forceUpdate();
        }
      } else {
        this.props.handleMessage(`You don't have the right KEY in your BAG!`);
      }
    } else {
      this.props.handleMessage("There is no door!");
    }
  }

  pick() {
    const { pointerColIndex: y, pointerRowIndex: x, gridMap } = this.state;

    if (isElementKey(gridMap[x][y])) {
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
      gridMap[x][y] != WALL &&
      gridMap[x][y] != WALL_D
    ) {
      // mark as already visited if it's not a KEY or EXIT
      if (!isElementDoor(gridMap[x][y]) && !isElementKey(gridMap[x][y])) {
        gridMap[x][y] = VISITED;
      }

      this.setState({ gridMap });
      this.setState({ pointerRowIndex: x, pointerColIndex: y });
      return true;
    }
    return false;
  }
  calculatePointerOffset({ row, col }) {
    const {
      offsetWidth,
      offsetHeight,
      offsetLeft,
      offsetTop,
    } = document.getElementById(`#grid-cell-${row}-${col}`);

    this.setState({
      pointerX: offsetLeft,
      pointerY: offsetTop,
      pointerHeight: offsetHeight,
      pointerWidth: offsetWidth,
    });
  }
  moveRight() {
    const { pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex,
        pointerColIndex: pointerColIndex + 1,
      })
    ) {
      this.calculatePointerOffset({
        row: pointerRowIndex,
        col: pointerColIndex + 1,
      });

      this.props.handleMessage(`You steped to the right!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
    }
  }

  moveLeft() {
    const { pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex,
        pointerColIndex: pointerColIndex - 1,
      })
    ) {
      this.calculatePointerOffset({
        row: pointerRowIndex,
        col: pointerColIndex - 1,
      });

      this.props.handleMessage(`You steped to the left!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
    }
  }

  moveUp() {
    const { pointerRowIndex, pointerColIndex } = this.state;

    if (
      this.checkPointer({
        pointerRowIndex: pointerRowIndex - 1,
        pointerColIndex,
      })
    ) {
      this.calculatePointerOffset({
        row: pointerRowIndex - 1,
        col: pointerColIndex,
      });

      this.props.handleMessage(`You steped up!`);
    } else {
      this.props.handleMessage(`You can't move there! There is a wall ...`);
    }
  }
  moveDown() {
    const { pointerColIndex, pointerRowIndex } = this.state;

    if (
      this.checkPointer({
        pointerColIndex,
        pointerRowIndex: pointerRowIndex + 1,
      })
    ) {
      this.calculatePointerOffset({
        row: pointerRowIndex + 1,
        col: pointerColIndex,
      });

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
    window.addEventListener("DOMContentLoaded", this.recalculateCellSize);
    window.addEventListener("resize", this.recalculateCellSize);
    window.addEventListener("keydown", this.handleOnKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.recalculateCellSize);
    window.removeEventListener("keydown", this.handleOnKeyDown);
    window.removeEventListener("DOMContentLoaded", this.recalculateCellSize);
  }
  recalculateCellSize() {
    const containerWidth = document.getElementById("grid-container")
      .clientWidth;

    this.setState({
      containerWidth,
      cellSize: Math.floor(containerWidth / this.state.gridSize) - 1,
    });

    this.calculatePointerOffset({
      row: this.state.pointerRowIndex,
      col: this.state.pointerColIndex,
    });
  }
  recalculatePointerSize({ pointerWidth, pointerHeight }) {
    this.setState({
      pointerWidth,
      pointerHeight,
    });
  }
  render() {
    const { gridMap, backpack } = this.state;

    return (
      <>
        <div className="col s10 grid-container" id="grid-container">
          <Grid
            data={gridMap}
            cellSize={this.state.cellSize}
            recalculate={this.recalculatePointerSize}
          />
          <GridPointer
            width={this.state.pointerWidth}
            height={this.state.pointerHeight}
            top={this.state.pointerY}
            left={this.state.pointerX}
          />
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

GridContainer.propTypes = {
  handleMessage: PropTypes.func.isRequired,
  mapper: PropTypes.array.isRequired,
  size: PropTypes.number.isRequired,
};

export default GridContainer;
