import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import GridMessage from "./GridMessage";

describe("<GridMessage />", () => {
  const props = {
    log: "Some log message here",
  };

  test("renders and displays properly", () => {
    const wrapper = shallow(<GridMessage {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("render log message properly", () => {
    const wrapper = shallow(<GridMessage {...props} />);
    expect(wrapper.find(props.log)).toBeTruthy();
  });
});
