import React from "react";
import SideMenu from "./SideMenu";
import AddProduct from "../../component/addProduct/AddProduct";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { SvgIcon } from "@mui/material";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

let getByTestId: any;
let getAllByTestId: any;

interface MenuItems {
  name: string;
  icon: typeof SvgIcon;
  compo: JSX.Element;
}

beforeEach(() => {
  const items: MenuItems[] = [
    {
      name: "Products list",
      icon: FormatListBulletedRoundedIcon,
      compo: <AddProduct />
    },
    { name: "Add product", icon: AddCircleRoundedIcon, compo: <AddProduct /> }
  ];

  const component = render(
    <SideMenu menuItems={items} OnSelectedItemChange={() => {}} />
  );

  getByTestId = component.getByTestId;
  getAllByTestId = component.getAllByTestId;
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

    iconEl.forEach((item: any) => {
      expect(item).toBeTruthy();
    });
  });

  test("Menu item has a text", () => {
    const textEl = getAllByTestId("menu-item-text");

    expect(textEl).toBeTruthy();
  });

  test("After clicking on a button it is selected", () => {
    const menuItemEl = getAllByTestId("menu-item");

    const menuItemElSelected = menuItemEl.filter((item: any) => {
      return !item.className.includes("Mui-selected");
    });

    menuItemElSelected.forEach((item) => {
      fireEvent.click(item);

      expect(item.className.includes("Mui-selected")).toBeTruthy();
    });
  });
});
