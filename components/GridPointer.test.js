import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import GridPointer from "./GridPointer";

describe("<GridPointer />", () => {
  test("render and displays properly", () => {
    const props = { width: 100, height: 100, left: 0, top: 0 };
    const wrapper = shallow(<GridPointer {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
