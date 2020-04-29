import React, { useState } from "react";
import {
  KEYS,
  DOORS,
  WALL,
  WALL_D,
  VISITED,
  MIN_MAP_SIZE,
  MAX_MAP_SIZE,
  EMPTY,
  MARK_SELECTED,
  EMPTY_BACKPACK_CELL,
} from "./constants";

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

export const renderIconMapper = (tag) => {
  if (tag === WALL) {
    return { color: "indigo-text text-darken-2", name: "border_all" };
  }
  if (tag === WALL_D) {
    return { color: "indigo-text text-darken-2", name: "border_clear" };
  }

  if (Array.isArray(tag)) {
    const [tagIndex, tagName] = tag;

    if (tagIndex === DOORS.RED_DOOR[0] && tagName === DOORS.RED_DOOR[1]) {
      return { color: "red-text ", name: "lock_outline" };
    }
    if (tagIndex === DOORS.GREEN_DOOR[0] && tagName === DOORS.GREEN_DOOR[1]) {
      return { color: "green-text ", name: "lock_outline" };
    }
    if (tagIndex === DOORS.BLUE_DOOR[0] && tagName === DOORS.BLUE_DOOR[1]) {
      return { color: "blue-text ", name: "home" };
    }
    if (tagIndex === KEYS.RED_KEY[0] && tagName === KEYS.RED_KEY[1]) {
      return { color: "red-text ", name: "vpn_key" };
    }
    if (tagIndex === KEYS.BLUE_KEY[0] && tagName === KEYS.BLUE_KEY[1]) {
      return { color: "blue-text ", name: "vpn_key" };
    }
    if (tagIndex === KEYS.GREEN_KEY[0] && tagName === KEYS.GREEN_KEY[1]) {
      return { color: "green-text ", name: "vpn_key" };
    }
  }
  return { color: "", name: "" };
};

export const mapIconColor = (tag) => {
  if (tag === WALL) {
    return "indigo";
  }
  if (tag === WALL_D) {
    return "indigo lighten-3";
  }
  if (tag === EMPTY) {
    return "green lighten-4";
  }
  if (tag === MARK_SELECTED) {
    return "blue lighten-3";
  }
  if (Array.isArray(tag)) {
    const [index, name] = tag;
    if (index === DOORS.RED_DOOR[0] && name === DOORS.RED_DOOR[1]) {
      return "red darken-3";
    }
    if (index === DOORS.BLUE_DOOR[0] && name === DOORS.BLUE_DOOR[1]) {
      return "blue darken-3";
    }
    if (index === DOORS.GREEN_DOOR[0] && name === DOORS.GREEN_DOOR[1]) {
      return "green darken-3";
    }
    if (index === KEYS.RED_KEY[0] && name === KEYS.RED_KEY[1]) {
      return "red";
    }
    if (index === KEYS.BLUE_KEY[0] && name === KEYS.BLUE_KEY[1]) {
      return "blue";
    }
    if (index === KEYS.GREEN_KEY[0] && name === KEYS.GREEN_KEY[1]) {
      return "green";
    }
  }
  return "";
};

export const keyToDoorMapper = ([doorIndex, doorTag]) => {
  switch (doorTag) {
    case "GREEN":
      return KEYS.GREEN_KEY;
    case "BLUE":
      return KEYS.BLUE_KEY;
    case "RED":
      return KEYS.RED_KEY;
  }
};

export const isExit = ([doorIndex, doorTag]) =>
  doorIndex === DOORS.BLUE_DOOR[0] && doorTag === DOORS.BLUE_DOOR[1];

export const useKey = (backpack, key) => {
  const index = backpack.findIndex((item) => item[0] == key[0]);
  if (index !== undefined) {
    backpack[index] = EMPTY_BACKPACK_CELL;
  }
};
