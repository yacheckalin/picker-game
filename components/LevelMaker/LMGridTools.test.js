import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import LMGridTools from "./LMGridTools";

describe("<LMGridTools />", () => {
  const props = {
    open: true,
    cellWidth: 20,
    cellHeight: 20,
    cellSize: 3,
    parentTop: 0,
    parentLeft: 0,
    gridWidth: 300,
    multipleMode: false,
    handleInsert: jest.fn(),
  };
  test("renders and displays properly", () => {
    const wrapper = shallow(<LMGridTools {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("all tools renders properly", () => {
    const wrapper = shallow(<LMGridTools {...props} />);
    expect(wrapper.find("a")).toHaveLength(8);
  });

  test("multiple select possible only for walls", () => {
    const wrapper = shallow(<LMGridTools {...props} multipleMode={true} />);
    expect(wrapper.find("a.disabled")).toHaveLength(6);

    wrapper.unmount();
  });

  //TODO: Add e2e tests for elements on a grid (by color classes)
});
