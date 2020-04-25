import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";

import BackPack from "./BackPack";
import { KEYS } from "../constants";

describe("<BackPack />", () => {
  const props = {
    data: [0, 0, 0, KEYS.GREEN_KEY, 0, 0, KEYS.BLUE_KEY],
    cellSize: 20,
  };

  test("renders and displays properly", () => {
    const wrapper = mount(<BackPack {...props} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("render all keys", () => {
    const wrapper = mount(<BackPack {...props} />);
    expect(wrapper.find(".text-green")).toBeTruthy();
    expect(wrapper.find(".text-blue")).toBeTruthy();
  });

  test("renders backpack with the right size", () => {
    const wrapper = mount(<BackPack {...props} />);
    expect(wrapper.find("tr")).toHaveLength(props.data.length);
  });

  test("set the right height and weight from the cellSize property", () => {
    const wrapper = mount(<BackPack {...props} />);
    expect(wrapper.find(".stack-key").first().prop("width")).toBe(
      props.cellSize
    );
  });
});
