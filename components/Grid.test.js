import React from "react";
import Grid from "./Grid";
import { mount } from "enzyme";
import toJSON from "enzyme-to-json";

import { LEVELS } from "../levels";

describe("<Grid />", () => {
  const props = {
    data: LEVELS[0][1],
    cellSize: 40,
    recalculate: jest.fn(),
  };
  test("renders and displays properly", () => {
    const wrapper = mount(<Grid {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("all grid cell drawed properly", () => {
    const wrapper = mount(<Grid {...props} />);
    expect(wrapper.find("div.grid-cell")).toHaveLength(16);
  });
});
