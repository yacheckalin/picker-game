import React from "react";

import { shallow, mount, render, unmount } from "enzyme";
import toJSON from "enzyme-to-json";
import LMForm from "./LMForm";

import { DEFAULT_GRID_MAP } from "../../constants";

describe("<LMForm />", () => {
  const props = {
    generate: jest.fn(),
    gridData: DEFAULT_GRID_MAP,
  };
  test("renders and displays properly", () => {
    const wrapper = shallow(<LMForm {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  describe("validate field", () => {
    test("grid size", () => {
      const wrapper = shallow(<LMForm {...props} />);

      expect(wrapper.find("#level-maker-grid-size")).toHaveLength(1);
    });
    test("grid hash", () => {
      const wrapper = shallow(<LMForm {...props} />);

      expect(wrapper.find("#level-maker-grid-hash")).toHaveLength(1);
    });
    test("grid mission", () => {
      const wrapper = shallow(<LMForm {...props} />);

      expect(wrapper.find("#level-maker-grid-mission")).toHaveLength(1);
    });
    test("three button on a screen", () => {
      const wrapper = shallow(<LMForm {...props} />);

      expect(wrapper.find("a.btn")).toHaveLength(3);
      expect(wrapper.find("a.btn").at(0).text()).toBe("Generate");
      expect(wrapper.find("a.btn").at(1).text()).toBe("Hide");
      expect(wrapper.find("a.btn").at(2).text()).toBe("Save");
    });

    test("disable Generate/Save button when size greater then MAX_MAP_SIZE", () => {
      const wrapper = mount(<LMForm {...props} />);
      wrapper
        .find("#level-maker-grid-size")
        .simulate("change", { target: { value: "200" } });
      expect(wrapper.find("a.btn").at(0).hasClass("disabled")).toBeTruthy();
    });

    test("disable Generate/Save button when size less then MIN_MAP_SIZE", () => {
      const wrapper = mount(<LMForm {...props} />);
      wrapper
        .find("#level-maker-grid-size")
        .simulate("change", { target: { value: "2" } });
      expect(wrapper.find("a.btn").at(0).hasClass("disabled")).toBeTruthy();
      expect(wrapper.find("a.btn").at(2).hasClass("disabled")).toBeTruthy();
    });

    test("disable Generate/Save button when hash is empty", () => {
      const wrapper = mount(<LMForm {...props} />);
      wrapper
        .find("#level-maker-grid-hash")
        .simulate("change", { target: { value: "" } });
      expect(wrapper.find("a.btn").at(0).hasClass("disabled")).toBeTruthy();
      expect(wrapper.find("a.btn").at(2).hasClass("disabled")).toBeTruthy();
    });

    test("disable Generate/Save button when mission is empty", () => {
      const wrapper = mount(<LMForm {...props} />);
      wrapper
        .find("#level-maker-grid-mission")
        .simulate("change", { target: { value: "" } });
      expect(wrapper.find("a.btn").at(0).hasClass("disabled")).toBeTruthy();
      expect(wrapper.find("a.btn").at(2).hasClass("disabled")).toBeTruthy();
    });

    test("hide/show form ", () => {
      const wrapper = mount(<LMForm {...props} />);

      wrapper
        .find("#level-maker-grid-mission")
        .simulate("change", { target: { value: "mission" } });
      wrapper
        .find("#level-maker-grid-hash")
        .simulate("change", { target: { value: "hash" } });
      wrapper
        .find("#level-maker-grid-size")
        .simulate("change", { target: { value: "20" } });

      wrapper.find("a.btn").at(1).simulate("click");
      expect(wrapper.find("#level-maker-grid-mission")).toHaveLength(0);
      expect(wrapper.find("a.btn").at(0).text()).toBe("Show");

      wrapper.find("a.btn").at(0).simulate("click");
      expect(wrapper.find("#level-maker-grid-mission")).toHaveLength(1);
    });

    test("generate shows the message on a screen", () => {
      const wrapper = mount(<LMForm {...props} />);

      wrapper.find("a.btn").at(0).simulate("click");
      expect(wrapper.find("span.secondary-content").text()).toBe(
        "Map has been generated"
      );
      wrapper.unmount();
    });
  });
});
