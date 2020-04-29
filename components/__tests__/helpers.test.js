import {
  stuffColorPicker,
  isElementKey,
  isElementDoor,
  isInABackPack,
  renderIconMapper,
} from "../../helpers";

import { KEYS, DOORS, WALL, WALL_D } from "../../constants";

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

  it("isInABackPack returns false", () => {
    const backpack = [[23, "GREEN"], 0, 0, 0, 0];
    const el = [92, "RED"];

    expect(isInABackPack(backpack, el)).toBeFalsy();
  });

  it("isInABackPack returns true", () => {
    const backpack = [[23, "RED"], 0, 0, 0, 0];
    const el = [92, "RED"];

    expect(isInABackPack(backpack, el)).toBeTruthy();
  });

  describe("renderIconMapper cases", () => {
    it("works properly", () => {
      expect(renderIconMapper(0)).toEqual({ color: "", name: "" });
      expect(renderIconMapper(WALL)).toEqual({
        color: "indigo-text text-darken-2",
        name: "border_all",
      });
      expect(renderIconMapper(WALL_D)).toEqual({
        color: "indigo-text text-darken-2",
        name: "border_clear",
      });
      expect(renderIconMapper(DOORS.RED_DOOR)).toEqual({
        color: "red-text ",
        name: "lock_outline",
      });
      expect(renderIconMapper(DOORS.GREEN_DOOR)).toEqual({
        color: "green-text ",
        name: "lock_outline",
      });
      expect(renderIconMapper(DOORS.BLUE_DOOR)).toEqual({
        color: "blue-text ",
        name: "home",
      });

      expect(renderIconMapper(KEYS.RED_KEY)).toEqual({
        color: "red-text ",
        name: "vpn_key",
      });
      expect(renderIconMapper(KEYS.BLUE_KEY)).toEqual({
        color: "blue-text ",
        name: "vpn_key",
      });
      expect(renderIconMapper(KEYS.GREEN_KEY)).toEqual({
        color: "green-text ",
        name: "vpn_key",
      });
    });
  });
});
