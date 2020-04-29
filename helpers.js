import React, { useState } from "react";
import { KEYS, DOORS, WALL, WALL_D, VISITED } from "./constants";
import { MIN_MAP_SIZE, MAX_MAP_SIZE } from "./components/LevelMaker/constants";

export const stuffColorPicker = ([keyIndex, keyTag]) => {
  switch (keyTag) {
    case KEYS.BLUE_KEY[1]:
      return "blue";
    case KEYS.GREEN_KEY[1]:
      return "green";
    case KEYS.RED_KEY[1]:
      return "red";
  }
};

export const isInABackPack = (backpack, [, elTag]) => {
  let inBackpack = false;
  for (const item of backpack) {
    if (item?.[1] === elTag) {
      inBackpack = true;
    }
  }
  return inBackpack;
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
