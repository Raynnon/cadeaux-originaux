import { render, fireEvent, screen, prettyDOM } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddProduct from "./AddProduct";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../app/state/store";

beforeEach(() => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <AddProduct />
      </MemoryRouter>
    </Provider>
  );
});

describe("Form elements", () => {
  test("Name field exists", () => {
    const nameField = screen.getByTestId("name-field");

    expect(nameField).toBeTruthy();
  });

  test("Prices exist", () => {
    const pricesCheckbox = screen.getAllByTestId("prices-field");
    expect(pricesCheckbox).toBeTruthy();
  });

  test("Description exists", () => {
    const descriptionField = screen.getByTestId("description-field");
    expect(descriptionField).toBeTruthy();
  });

  test("Strong points exists", () => {
    const strongPointsField = screen.getByTestId("strong-points-field");
    expect(strongPointsField).toBeTruthy();
  });

  test("Images upload exists", () => {
    const imagesUploadField = screen.getByTestId("images-upload-field");
    expect(imagesUploadField).toBeTruthy();
  });

  test("Image Url field exists", () => {
    const urlField = screen.getByTestId("url-field");
    expect(urlField).toBeTruthy();
  });

  test("categories group exist", () => {
    const categoriesGroup = screen.getAllByTestId("categories-group");
    expect(categoriesGroup).toBeTruthy();
  });

  test("Ajouter produit button exists", () => {
    const addProductButton = screen.getAllByTestId("add-product-button");
    expect(addProductButton).toBeTruthy();
  });
});

describe("Testing Strong points functionalities", () => {
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
});
