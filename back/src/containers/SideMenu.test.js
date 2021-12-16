import React from "react";
import { store } from "../app/store";
import SideMenu from "./SideMenu";
import { Provider } from "react-redux";

import { render, fireEvent, screen } from "@testing-library/react";

/* import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { SvgIcon } from "@mui/material"; */
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

let getByTestId;
let getAllByTestId;

beforeAll(() => {
  const component = render(
    <Provider store={store}>
      <SideMenu />
    </Provider>
  );

  getByTestId = component.getByTestId;
  getAllByTestId = component.getByTestId;
});

//GENERAL TESTS
test("top image correctly displays", () => {
  const imgEl = getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
});

//MENU ITEM
describe("Menu item", () => {
  test("Menu item has an icon", () => {
    const iconEl = getAllByTestId("menu-item-icon");

    iconEl.forEach((item) => {
      expect(item).toBeTruthy();
    });
  });

 /*  test("Menu item has a text", () => {
    render(<SideMenu />);
    const textEl = screen.getAllByTestId("menu-item-text");

    expect(textEl).toBeTruthy();
  });

  test("After clicking on a button it is selected", () => {
    render(<SideMenu />);
    const menuItemEl = screen.getAllByTestId("menu-item");

    const menuItemElSelected = menuItemEl.filter((item) => {
      return !item.className.includes("Mui-selected");
    });

    menuItemElSelected.forEach((item) => {
      fireEvent.click(item);

      expect(item.className.includes("Mui-selected")).toBeTruthy();
    });
  }); */
});
