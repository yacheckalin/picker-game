import { KEYS } from "./constants";

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
  // for (const [k, v] of Object.values(KEYS)) {
  //   if (v === key) return true;
  // }
  // return false;
  return Object.values(KEYS).includes(key);
};
