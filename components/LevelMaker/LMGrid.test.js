import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import LMGrid from "./LMGrid";

import { DEFAULT_GRID_MAP, DEFAULT_GRID_SIZE } from "../../constants";

jest.mock("shortid", () => {
  return {
    generate: jest.fn(() => 1),
  };
});

describe("<LMGrid />", () => {
  const props = {
    data: DEFAULT_GRID_MAP,
    size: DEFAULT_GRID_SIZE,
  };

  test("displays and shows properly", () => {
    const wrapper = shallow(<LMGrid {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
