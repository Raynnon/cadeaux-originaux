const { execCmd } = require("./copyDatabase.js");

describe("Testing execCmd", () => {
  test("execCMD rejection", async () => {
    expect.assertions(1);
    return expect(
      execCmd("cmdError", "Failed to restore DB", "DB dumped")
    ).rejects.toBe("Failed to restore DB");
  });

  test("execCMD resolve", async () => {
    expect.assertions(1);
    return expect(
      execCmd("ls", "Failed to restore DB", "DB dumped")
    ).resolves.toBe("DB dumped");
  });
});
