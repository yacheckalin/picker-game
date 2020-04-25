import { KEYS, DOORS, WALL, VISITED, WALL_D } from "./constants";

export const LEVELS = [
  [
    "level_zero",
    [
      [VISITED, 0, WALL, 0],
      [0, WALL, 0, DOORS.BLUE_DOOR],
      [0, WALL, 0, 0],
      [0, 0, 0, KEYS.BLUE_KEY],
    ],
    4,
    "Pick the blue key and open the blue door",
  ],
  [
    "level_1", // the map hash
    [
      // the map
      [VISITED, 0, WALL, WALL, 1, 1, 1, 1],
      [1, 0, 1, 0, 0, 0, KEYS.RED_KEY, 1],
      [1, 0, 1, 0, 1, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, KEYS.BLUE_KEY, 1],
      [1, 0, 0, 0, 1, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 1],
      [1, KEYS.GREEN_KEY, 1, 0, 0, 0, 0, DOORS.BLUE_DOOR],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    8, // size of map
    "Open the blue door to find exit!", // mission
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
    8,
    "Open the blue door to find exit!",
  ],
  [
    "level_3",
    [
      [
        VISITED,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
        WALL,
      ],
      [0, WALL, 0, WALL, 0, WALL, 0, 0, 0, KEYS.RED_KEY, 0, 0],
      [0, WALL, 0, WALL, 0, WALL, 0, WALL, WALL, WALL, WALL, WALL],
      [0, 0, 0, 0, 0, WALL, 0, 0, 0, 0, 0, WALL],
      [WALL, WALL, 0, WALL, 0, WALL, 0, DOORS.BLUE_DOOR, 0, 0, 0, WALL],
      [0, 0, 0, WALL, 0, WALL, 0, 0, 0, 0, 0, 0],
      [0, WALL, WALL, WALL, 0, WALL, WALL, WALL, WALL, WALL, 0, 0],
      [0, WALL, 0, 0, 0, DOORS.GREEN_DOOR, WALL_D, 0, 0, 0, 0, 0],
      [0, WALL, 0, 0, 0, WALL, WALL, WALL, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, WALL, 0, WALL, WALL, WALL],
      [0, 0, 0, 0, 0, 0, 0, WALL, 0, DOORS.RED_DOOR, WALL_D, KEYS.BLUE_KEY],
      [KEYS.GREEN_KEY, 0, 0, 0, 0, 0, 0, WALL, 0, WALL, WALL, WALL],
    ],
    12,
    "Open the blue door to find exit!",
  ],
];
