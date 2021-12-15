/* import React from "react";
import SideMenu from "./SideMenu";
import AddProduct from "../../component/addProduct/AddProduct";
import { render, fireEvent, screen } from "@testing-library/react";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { SvgIcon } from "@mui/material";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

let getByTestId: any;
let getAllByTestId: any; */

//GENERAL TESTS

test("lol", () => {
  expect(true).toBeTruthy();
});
/* test("top image correctly displays", () => {
  render(<SideMenu />);
  const imgEl = screen.getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
}); */
/* 
//MENU ITEM
describe("Menu item", () => {
  test("Menu item has an icon", () => {
    render(<SideMenu />);
    const iconEl = screen.getAllByTestId("menu-item-icon");

    iconEl.forEach((item: any) => {
      expect(item).toBeTruthy();
    });
  });

  test("Menu item has a text", () => {
    render(<SideMenu />);
    const textEl = screen.getAllByTestId("menu-item-text");

    expect(textEl).toBeTruthy();
  });

  test("After clicking on a button it is selected", () => {
    render(<SideMenu />);
    const menuItemEl = screen.getAllByTestId("menu-item");

    const menuItemElSelected = menuItemEl.filter((item: any) => {
      return !item.className.includes("Mui-selected");
    });

    menuItemElSelected.forEach((item: any) => {
      fireEvent.click(item);

      expect(item.className.includes("Mui-selected")).toBeTruthy();
    });
  });
});
 */
