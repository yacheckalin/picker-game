import React, { useState } from "react";
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

  return true;
};

// Hook
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
