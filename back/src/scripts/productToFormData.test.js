import productToFormData from "./productToFormData";

test("returns a form data with parameters", () => {
  const result = productToFormData("Produit", "€", ["test", "salut"]);
  expect(result).toBeInstanceOf(FormData);
});

test("returns a form data without parameters", () => {
  const result = productToFormData();
  expect(result).toBeInstanceOf(FormData);
});
