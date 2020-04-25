import { KEYS } from "./constants";

export const stuffColorPicker = (key) => {
  switch (key) {
    case KEYS.BLUE_KEY:
      return "blue-text text-darken-4";
    case KEYS.GREEN_KEY:
      return "green-text text-darken-4";
    case KEYS.RED_KEY:
      return "red-text text-darken-4";
  }
};
