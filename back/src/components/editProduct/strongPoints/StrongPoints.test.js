import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import StrongPoints from "./StrongPoints";
import { store } from "../../../app/state/store";

beforeEach(() => {
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
});

test("Add strong point", () => {
  // Test inital state
  let strongPointsField = screen.getAllByTestId("strong-points-field");
  expect(strongPointsField.length).toBe(1);

  const addButton = screen.getByTestId("strong-point-add-button");

  // Test state after adding 1 field
  fireEvent.click(addButton);

  strongPointsField = screen.getAllByTestId("strong-points-field");

  expect(strongPointsField.length).toBe(2);
});

test("Add then Delete strong point", () => {
  // Test inital state
  let strongPointsField = screen.getAllByTestId("strong-points-field");
  const addButton = screen.getByTestId("strong-point-add-button");

  expect(strongPointsField.length).toBe(1);

  // Test state after adding 1 field
  fireEvent.click(addButton);

  strongPointsField = screen.getAllByTestId("strong-points-field");

  expect(strongPointsField.length).toBe(2);

  // Test state after removing 1 field
  const deleteButton = screen.getAllByTestId("strong-point-delete-button");

  fireEvent.click(deleteButton[1]);

  strongPointsField = screen.getAllByTestId("strong-points-field");

  expect(strongPointsField.length).toBe(1);
});
