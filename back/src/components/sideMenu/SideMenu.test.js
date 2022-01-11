import { render, screen } from "@testing-library/react";
import { store } from "../../app/state/store";
import { Provider } from "react-redux";
import SideMenu from "./SideMenu";
import { MemoryRouter } from "react-router-dom";

//GENERAL TESTS
test("top image correctly displays", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <SideMenu />
      </MemoryRouter>
    </Provider>
  );

  const imgEl = screen.getAllByTestId("logo-img");

  expect(imgEl).toBeTruthy();
});
