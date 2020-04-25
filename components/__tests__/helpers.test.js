import { stuffColorPicker } from "../../helpers";

import { KEYS } from "../../constants";

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
});
