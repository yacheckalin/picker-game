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
