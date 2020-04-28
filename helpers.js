import { KEYS, DOORS, WALL, WALL_D, VISITED } from "./constants";

export const stuffColorPicker = (key) => {
  switch (key) {
    case KEYS.BLUE_KEY:
      return "blue";
    case KEYS.GREEN_KEY:
      return "green";
    case KEYS.RED_KEY:
      return "red";
  }
};

export const isElementKey = (key) => {
  for (const [code, tag] of Object.values(KEYS)) {
    if (code === key[0] && tag === key[1]) return true;
  }
  return false;
};

export const isElementDoor = (door) => {
  for (const [code, tag] of Object.values(DOORS)) {
    if (code === door[0] && tag === door[1]) return true;
  }
  return false;
};

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

        // TODO: With this logic each door can appear only once
        if (isElementDoor(data[i][j])) {
          // do we already have this door in an array
          let hasADoor = false;
          for (const [[doorIndex, doorTag]] of doorCheck) {
            if (data[i][j][0] == doorIndex) {
              hasADoor = true;
            }
          }
          if (!hasADoor) {
            doorCheck.push([data[i][j], null]);
          }
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

    // TODO: This situation is not an error
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
  return true;
};
