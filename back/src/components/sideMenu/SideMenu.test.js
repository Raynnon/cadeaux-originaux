import { render, screen } from "@testing-library/react";
import logoMesCadeauxOriginaux from "./logo-cadeaux-originaux-small-white.png";
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

  const imgEl = screen.getByTestId("logo-img");

  expect(imgEl.src).toBe(`http://localhost/${logoMesCadeauxOriginaux}`);
});
