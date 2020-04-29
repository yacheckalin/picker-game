import { DOORS, KEYS } from "../../constants";
import { MIN_MAP_SIZE, MAX_MAP_SIZE } from "./constants";
import { isElementDoor, isElementKey } from "../../helpers";

export const validateLevelForExport = ([hash, data, size, mission]) => {
  if (!hash) {
    throw new Error("There is no level_hash!");
  }
  if (!mission) {
    throw new Error("There is no description for mission!");
  }
  if (!size) {
    throw new Error("Please specify a grid size!");
  }

  if (data.length != size) {
    throw new Error(`Map size doesn't match the grid!`);
  }

  const doorCheckScenario = () => {
    /**
     * [
     * [[20, "GREEN"], [90, 'GREEN']], // [[door][key]]
     * [[20, "GREEN"], null],
     * [[20, "GREEN"], null],
     *
     * ],
     *
     */
    let doorCheck = [];
    let isExitHere = false;
    let isBlueKeyHere = false;

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (data[i][j] == DOORS.BLUE_DOOR) {
          isExitHere = true;
        }
        if (data[i][j] == KEYS.BLUE_KEY) {
          isBlueKeyHere = true;
        }

        if (isElementDoor(data[i][j])) {
          doorCheck.push([data[i][j], null]);
        }
      }
    }

    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (isElementKey(data[i][j])) {
          const [keyIndex, keyTag] = data[i][j];

          for (let k = 0; k < doorCheck.length; k++) {
            const [[doorIndex, doorTag], key] = doorCheck[k];
            if (doorTag === keyTag && key === null) {
              doorCheck[k][1] = data[i][j];
            }
          }
        }
      }
    }

    for (let i = 0; i < doorCheck.length; i++) {
      const [[doorIndex, doorTag], key] = doorCheck[i];
      if (key === null) {
        throw new Error(`There is a ${doorTag} without key!`);
      }
    }
  };

  let isExitHere = false;
  let isBlueKeyHere = false;

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] == DOORS.BLUE_DOOR) {
        isExitHere = true;
      }
      if (data[i][j] == KEYS.BLUE_KEY) {
        isBlueKeyHere = true;
      }
    }
  }

  if (!isExitHere) {
    throw new Error("Please put blue door (exit)!");
  }
  if (!isBlueKeyHere) {
    throw new Error("There is no blue key on the map!");
  }

  doorCheckScenario();

  if (size < MIN_MAP_SIZE) {
    throw new Error(`Map size is less then ${MIN_MAP_SIZE}`);
  }

  if (size > MAX_MAP_SIZE) {
    throw new Error(`Map size is greater then ${MAX_MAP_SIZE}`);
  }

  return true;
};
