import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import LevelMakerContainer from "./LevelMakerContainer";

jest.mock("shortid", () => {
  return {
    generate: jest.fn(() => 1),
  };
});
describe("<LevelMakerContainer />", () => {
  test("renders and displays properly", () => {
    const wrapper = shallow(<LevelMakerContainer />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
