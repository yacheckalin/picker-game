import {
  KEYS,
  DOORS,
  WALL,
  WALL_D,
  VISITED,
  EMPTY,
  EMPTY_BACKPACK_CELL,
  DEFAULT_FIELD_SIZE,
  DEFAUTL_FIELD_HASH,
  MIN_MAP_SIZE,
  MAX_MAP_SIZE,
  DEFAULT_GRID_MAP,
  DEFAULT_CELL_SIZE,
  MARK_SELECTED,
  MARK_CLEAR,
} from "../../constants";

describe("constants", () => {
  test("MARK_CLEAR", () => {
    expect(MARK_CLEAR).toBe(0);
  });
  test("MARK_SELECTED", () => {
    expect(MARK_SELECTED).toBe(999);
  });
  test("DEFAUTL_CELL_SIZE", () => {
    expect(DEFAULT_CELL_SIZE).toBe(40);
  });
  test("DEFAUTL_GRID_MAP", () => {
    expect(DEFAULT_GRID_MAP).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
  test("MAX_MAP_SIZE", () => {
    expect(MAX_MAP_SIZE).toBe(50);
  });
  test("MIN_MAP_SIZE", () => {
    expect(MIN_MAP_SIZE).toBe(3);
  });
  test("DEFAUTL_FIELD_HASH", () => {
    expect(DEFAUTL_FIELD_HASH).toEqual("level_default");
  });
  test("DEFAULT_FIELD_SIZE", () => {
    expect(DEFAULT_FIELD_SIZE).toBe(4);
  });
  test("EMPTY_BACKPACK_CELL", () => {
    expect(EMPTY_BACKPACK_CELL).toBe(0);
  });
  test("EMPTY", () => {
    expect(EMPTY).toBe(0);
  });
  test("VISITED", () => {
    expect(VISITED).toBe(8);
  });
  test("WALL_D", () => {
    expect(WALL_D).toBe(2);
  });
  test("WALL", () => {
    expect(WALL).toBe(1);
  });
  test("DOORS", () => {
    expect(DOORS).toEqual({
      BLUE_DOOR: [90, "BLUE"],
      GREEN_DOOR: [91, "GREEN"],
      RED_DOOR: [92, "RED"],
    });
  });
  test("KEYS", () => {
    expect(KEYS).toEqual({
      BLUE_KEY: [20, "BLUE"],
      GREEN_KEY: [21, "GREEN"],
      RED_KEY: [22, "RED"],
    });
  });
});
