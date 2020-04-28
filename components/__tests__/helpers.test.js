import {
  stuffColorPicker,
  isElementKey,
  isElementDoor,
  validateLevelForExport,
} from "../../helpers";

import { KEYS, DOORS, VISITED, WALL, WALL_D } from "../../constants";

describe("helpers ", () => {
  it("stuffColorPicker return class for BLUE_KEY", () => {
    expect(stuffColorPicker(KEYS.BLUE_KEY)).toEqual("blue");
  });

  it("stuffColorPicker return class for GREEN_KEY", () => {
    expect(stuffColorPicker(KEYS.GREEN_KEY)).toEqual("green");
  });

  it("stuffColorPicker return class for RED_KEY", () => {
    expect(stuffColorPicker(KEYS.RED_KEY)).toEqual("red");
  });

  it("isElementKey return true", () => {
    expect(isElementKey(KEYS.BLUE_KEY)).toBeTruthy();
  });

  it("isElementKey return false", () => {
    expect(isElementKey([1111, "some other tag"])).toBeFalsy();
  });

  it("isElementDoor return true", () => {
    expect(isElementDoor(DOORS.GREEN_DOOR)).toBeTruthy();
  });

  it("isElementDoor return false", () => {
    expect(isElementDoor([1111, "some other tag"])).toBeFalsy();
  });

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
    const levelWithoutHash = ["", validData, size, mission];
    const levelWithoutMission = [hash, validData, size, ""];
    const levelWithoutSize = [hash, validData, , mission];
    const levelWithoutData = [hash, [], size, mission];
    const levelSizeMismatch = [hash, validData, 5, mission];
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
    it("succesfully validated", () => {
      expect(validateLevelForExport(succesfullLevel)).toBeTruthy();
    });
  });
});
