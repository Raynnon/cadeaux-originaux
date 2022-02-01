import readProducts from "./readProducts";
const axios = require("axios");

jest.mock("axios");

test("Function returns an array of objects", async () => {
  const data = {
    data: [
      {
        name: "Lampe en forme de rose"
      },
      {
        name: "Fontaine pour animaux"
      }
    ]
  };

  axios.get.mockResolvedValue({
    data
  });

  const products = await readProducts();

  expect(products).toBe(data);

  const productsWithOption = await readProducts("options");

  expect(productsWithOption
    ).toBe(data);
});
