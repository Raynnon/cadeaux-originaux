import reducer, { changeSelectedMenuItem } from "./menuSlice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
    selectedMenuItem: "PRODUITS"
  });
});

test("should handle selectedMenuItem change", () => {
  const previousState = {
    selectedMenuItem: "PRODUITS"
  };

  expect(
    reducer(previousState, changeSelectedMenuItem("AJOUTER PRODUITS"))
  ).toEqual({
    selectedMenuItem: "AJOUTER PRODUITS"
  });
});
