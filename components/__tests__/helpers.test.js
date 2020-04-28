import { stuffColorPicker, isElementKey, isElementDoor } from "../../helpers";

import { KEYS, DOORS } from "../../constants";

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
});
