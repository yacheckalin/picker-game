import React from "react";
import GridIntro from "./GridIntro";
import toJSON from "enzyme-to-json";
import { shallow, mount } from "enzyme";

import { LEVELS } from "../levels";

describe("<GridIntro />", () => {
  const defaultProps = {
    loadHandler: jest.fn(),
  };

  test("render properly", () => {
    const wrapper = shallow(<GridIntro {...defaultProps} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("render collapsible list on a page", () => {
    const wrapper = shallow(<GridIntro {...defaultProps} />);

    expect(wrapper.find(`collapsible`)).toBeTruthy();
  });

  test("render entire list of levels properly", () => {
    const wrapper = shallow(<GridIntro {...defaultProps} />);
    for (const [hash, grid, size, mission] of LEVELS) {
      expect(wrapper.find(hash)).toBeTruthy();
    }
  });

  test("when select level from the list, mission changes", () => {
    const wrapper = shallow(<GridIntro {...defaultProps} />);
    wrapper.find("select").simulate("change", { target: { value: "1" } });

    expect(wrapper.text()).toContain(`${LEVELS[1][3]}`);
  });

  test("render navigation explanations", () => {
    const wrapper = shallow(<GridIntro {...defaultProps} />);
    expect(wrapper.find("open the door")).toBeTruthy();
    expect(wrapper.find("pick")).toBeTruthy();
    expect(wrapper.find("go up")).toBeTruthy();
    expect(wrapper.find("go down")).toBeTruthy();
    expect(wrapper.find("go left")).toBeTruthy();
    expect(wrapper.find("go right")).toBeTruthy();
  });
});
