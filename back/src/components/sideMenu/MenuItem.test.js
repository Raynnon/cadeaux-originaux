import { render, fireEvent, screen } from "@testing-library/react";
import { store } from "../../app/state/store";
import { Provider } from "react-redux";
import MenuItem from "./MenuItem";
import { MemoryRouter } from "react-router-dom";

import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";

test("Menu item has an icon", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MenuItem
          name={"PRODUITS"}
          Icon={FormatListBulletedRoundedIcon}
          link={"produits"}
        />
      </MemoryRouter>
    </Provider>
  );

  const iconEl = screen.getAllByTestId("menu-item-icon");

  expect(iconEl).toBeTruthy();
});

test("Menu item has a text", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MenuItem
          name={"PRODUITS"}
          Icon={FormatListBulletedRoundedIcon}
          link={"produits"}
        />
      </MemoryRouter>
    </Provider>
  );
  const textEl = screen.getAllByTestId("menu-item-text");

  expect(textEl).toBeTruthy();
});

test("After clicking on a button it is selected", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <MenuItem
          name={"PRODUITS"}
          Icon={FormatListBulletedRoundedIcon}
          link={"produits"}
        />
        <MenuItem
          name={"AJOUTER PRODUITS"}
          Icon={AddCircleRoundedIcon}
          link={"ajouter-produits"}
        />
      </MemoryRouter>
    </Provider>
  );
  const menuItemEl = screen.getAllByTestId("menu-item");

  const menuItemElSelected = menuItemEl.filter((item) => {
    return !item.className.includes("Mui-selected");
  });

  menuItemElSelected.forEach((item) => {
    fireEvent.click(item);

    expect(item.className.includes("Mui-selected")).toBeTruthy();
  });
});
