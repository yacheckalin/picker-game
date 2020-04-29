import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import { DOORS, KEYS, WALL, WALL_D } from "../../constants";

import LMGridObjectIcon from "./LMGridObjectIcon";

describe("<LMGridObjectIcon />", () => {
  const initProps = {
    tag: DOORS.RED_DOOR,
  };
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<LMGridObjectIcon {...initProps} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });
  test("renders and displays properly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("render keys icons properly", () => {
    wrapper = shallow(<LMGridObjectIcon tag={KEYS.GREEN_KEY} />);
    expect(wrapper.contains("vpn_key")).toBe(true);
  });
  test("render doors icons properly", () => {
    wrapper = shallow(<LMGridObjectIcon tag={DOORS.GREEN_DOOR} />);
    expect(wrapper.contains("lock_outline")).toBe(true);
  });
  test("render walls icons properly", () => {
    wrapper = shallow(<LMGridObjectIcon tag={WALL} />);
    expect(wrapper.contains("border_all")).toBe(true);
  });
  test("render walls icons properly", () => {
    wrapper = shallow(<LMGridObjectIcon tag={WALL_D} />);
    expect(wrapper.contains("border_clear")).toBe(true);
  });
});
