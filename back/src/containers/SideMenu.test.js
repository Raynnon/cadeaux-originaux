import { SvgIcon } from "@mui/material"; */
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";

let getByTestId;
let getAllByTestId;

beforeAll(() => {
  const component = render(
//GENERAL TESTS
test("top image correctly displays", () => {
  render(
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
  const imgEl = screen.getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
});

//MENU ITEM
describe("Menu item", () => {
  test("Menu item has an icon", () => {
    const iconEl = getAllByTestId("menu-item-icon");
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

 /*  test("Menu item has a text", () => {
    render(<SideMenu />);
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
    render(<SideMenu />);
    render(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );

    const menuItemEl = screen.getAllByTestId("menu-item");

    const menuItemElSelected = menuItemEl.filter((item) => {
@@ -61,5 +67,5 @@ describe("Menu item", () => {

      expect(item.className.includes("Mui-selected")).toBeTruthy();
    });
  }); */
  });
});