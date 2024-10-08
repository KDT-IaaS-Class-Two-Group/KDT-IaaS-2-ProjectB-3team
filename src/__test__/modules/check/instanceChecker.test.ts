import { expect, it, describe, afterEach } from "@jest/globals";
import { jest } from "@jest/globals";
import instanceChecker from "@/modules/check/instanceChecker";
import thrower from "@/modules/throw/thrower";

// jest.mock("../throw/thrower");

describe("instanceChecker", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error when target is the same as className", () => {
    const testClass = class {};
    const instanceCheckerStaticMessage = "cannot be instantiated";

    expect(() => {
      instanceChecker(testClass, testClass);
    }).toThrow(`${testClass} ${instanceCheckerStaticMessage}`);
  });

  it("should not throw an error when target is different from className", () => {
    const testClass1 = class {};
    const testClass2 = class {};

    expect(() => {
      instanceChecker(testClass1, testClass2);
    }).not.toThrow();
  });
});
