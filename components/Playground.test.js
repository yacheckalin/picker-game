import React from "react";
import Playground from "./Playground";
import toJSON from "enzyme-to-json";
import { shallow } from "enzyme";

describe("<Playground />", () => {
  const props = {};

  it("render and displays properly", () => {
    const wrapper = shallow(<Playground />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
