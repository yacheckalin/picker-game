import { validateLevelForExport } from "./validations";
import { WALL, KEYS, DOORS, VISITED } from "../../constants";

describe("validateLevelForExport ", () => {
  const hash = "level_hash_1";
  const mission = "Mission description";
  const size = 4;
  const validData = [
    [VISITED, 0, WALL, 0],
    [0, WALL, 0, DOORS.BLUE_DOOR],
    [KEYS.BLUE_KEY, WALL, 0, 0],
    [0, 0, 0, KEYS.BLUE_KEY],
  ];
  const invalidDataWithoutExit = [
    [VISITED, 0, WALL, 0],
    [0, WALL, 0, DOORS.RED_DOOR],
    [KEYS.BLUE_KEY, WALL, 0, 0],
    [0, 0, 0, KEYS.BLUE_KEY],
  ];
  const invalidDataWithoutKey = [
    [VISITED, 0, WALL, 0],
    [0, WALL, 0, DOORS.BLUE_DOOR],
    [KEYS.RED_KEY, WALL, 0, 0],
    [0, 0, 0, 0],
  ];
  const invalidDataDoorWithoutKey = [
    [VISITED, 0, WALL, 0],
    [0, WALL, 0, DOORS.BLUE_DOOR],
    [KEYS.BLUE_KEY, WALL, 0, DOORS.RED_DOOR],
    [0, 0, 0, 0],
  ];

  const levelWithoutHash = ["", validData, size, mission];
  const levelWithoutMission = [hash, validData, size, ""];
  const levelWithoutSize = [hash, validData, , mission];
  const levelWithoutData = [hash, [], size, mission];
  const levelSizeMismatch = [hash, validData, 5, mission];
  const levelSizeValidationLessCase = [hash, validData, 2, mission];
  const levelSizeValidationGreaterCase = [hash, validData, 52, mission];
  const succesfullLevel = [hash, validData, size, mission];
  const levelWithoutExit = [hash, invalidDataWithoutExit, size, mission];
  const levelWithoutExitKey = [hash, invalidDataWithoutKey, size, mission];

  it("throw hash error", () => {
    try {
      validateLevelForExport(levelWithoutHash);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });

  it("throw mission error", () => {
    try {
      validateLevelForExport(levelWithoutMission);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("throw size error", () => {
    try {
      validateLevelForExport(levelWithoutSize);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
  it("throw size error", () => {
    try {
      validateLevelForExport(levelSizeMismatch);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw size less then MIN_MAP_SIZE error", () => {
    try {
      validateLevelForExport(levelSizeValidationLessCase);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw size greater then MAX_MAP_SIZE error", () => {
    try {
      validateLevelForExport(levelSizeValidationGreaterCase);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw data error", () => {
    try {
      validateLevelForExport(levelWithoutData);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw  error", () => {
    try {
      validateLevelForExport(levelWithoutExit);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw  error", () => {
    try {
      validateLevelForExport(levelWithoutExitKey);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("throw  error", () => {
    try {
      validateLevelForExport(invalidDataDoorWithoutKey);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
  it("succesfully validated", () => {
    expect(validateLevelForExport(succesfullLevel)).toBeTruthy();
  });
});
