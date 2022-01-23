import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import StrongPoints from "./StrongPoints";
import { store } from "../../../app/state/store";

test("Component initiate correctly with an array of string with a length of 1", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <StrongPoints
          productStrongPoints={[""]}
          handleStrongPointsChange={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );

  let strongPointsField = screen.getAllByTestId("strong-points-field");
  expect(strongPointsField.length).toBe(1);
});

test("Component initiate correctly with an array of string with a length of 2", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <StrongPoints
          productStrongPoints={["Test", "Test"]}
          handleStrongPointsChange={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );

  let strongPointsField = screen.getAllByTestId("strong-points-field");
  expect(strongPointsField.length).toBe(2);

  const deleteButton = screen.getAllByTestId("strong-point-delete-button");
  expect(deleteButton.length).toBe(2);
});
