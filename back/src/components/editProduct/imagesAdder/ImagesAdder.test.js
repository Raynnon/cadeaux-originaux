import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../../app/state/store";
import ImagesAdder from "./ImagesAdder";

test("Component initiate correctly with an empty Array", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ImagesAdder productImages={[]} handleProductImagesChange={() => {}} />
      </MemoryRouter>
    </Provider>
  );

  const imageUploadField = screen.getAllByTestId("images-upload-field");
  expect(imageUploadField.length).toBe(1);
});

test("Component initiate correctly with an array of string with a length of 2", () => {
  const file = new File([""], "file-test", { type: "image/jpeg" });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ImagesAdder
          productImages={[file]}
          handleProductImagesChange={() => {}}
        />
      </MemoryRouter>
    </Provider>
  );

  const imageUploadField = screen.getAllByTestId("images-upload-field");
  expect(imageUploadField.length).toBe(2);

  const deleteButton = screen.getAllByTestId("images-upload-delete-button");
  expect(deleteButton.length).toBe(1);
});
