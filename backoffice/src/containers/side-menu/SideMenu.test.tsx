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
});

test("top image correctly displays", () => {
  const imgEl = getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
});
