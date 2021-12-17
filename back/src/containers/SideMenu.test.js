import { render, fireEvent, screen } from "@testing-library/react";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";
import { store } from "../app/store";
import { Provider } from "react-redux";
import SideMenu from "./SideMenu";

//GENERAL TESTS
test("top image correctly displays", () => {
  render(
    <Provider store={store}>
      <SideMenu />
    </Provider>
  );

  const imgEl = screen.getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
});

//MENU ITEM
describe("Menu item", () => {
  test("Menu item has an icon", () => {
    render(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );

    const iconEl = screen.getAllByTestId("menu-item-icon");

    iconEl.forEach((item) => {
      expect(item).toBeTruthy();
    });
  });

  test("Menu item has a text", () => {
    render(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );
    const textEl = screen.getAllByTestId("menu-item-text");

    expect(textEl).toBeTruthy();
  });

  test("After clicking on a button it is selected", () => {
    render(
      <Provider store={store}>
        <SideMenu />
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
});
