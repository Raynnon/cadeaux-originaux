import productToFormData from "./productToFormData";

test("returns a form data with parameters", () => {
  const result = productToFormData({
    name: "Produit",
    price: "€",
    occasions: ["test", "salut"]
  });
  expect(result).toBeInstanceOf(FormData);
});
