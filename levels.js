import { KEYS, DOORS, WALL, VISITED } from "./constants";

export const LEVELS = [
  [
    "level_1",
    [
      [VISITED, 0, WALL, WALL, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, KEYS.RED_KEY, 1],
      [1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, KEYS.BLUE_KEY, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, KEYS.GREEN_KEY, 1, 0, 0, 0, 0, DOORS.BLUE_DOOR],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ],
  [
    "level_2",
    [
      [VISITED, 0, WALL, WALL, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, KEYS.BLUE_KEY, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 0, 0, 0, DOORS.BLUE_DOOR],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
  ],
];
