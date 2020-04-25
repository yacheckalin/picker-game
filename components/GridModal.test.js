import React from "react";
import { shallow, mount, render } from "enzyme";
import toJSON from "enzyme-to-json";

import GridModal from "./GridModal";
// import M from "materialize-css/dist/js/materialize";

describe("<GridModal />", () => {
  const props = {
    message: "Winning message!",
    win: false,
  };

  test("renders and displays properly", () => {
    const wrapper = shallow(<GridModal {...props} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  test("render open modal", () => {
    const wrapper = render(<GridModal {...props} win={true} />);

    expect(wrapper.find(".modal-content").first().text()).toContain(
      props.message
    );
  });
});
