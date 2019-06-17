const exercise1 = require("../exercise1");

describe("exercise1", () => {
  it("throw error if input is not a number", () => {
    expect(() => {
      exercise1("string");
    });
  });

  it("return Buzz string if input number is devided by 5", () => {
    const result = exercise1(25);
    expect(result).toBe("Buzz");
  });

  it("return Fizz string if input number is devided by 3", () => {
    const result = exercise1(9);
    expect(result).toBe("Fizz");
  });

  it("return FizzBuzz string if input number is devided by 3 and 5", () => {
    const result = exercise1(15);
    expect(result).toBe("FizzBuzz");
  });

  it("return input number if its not devided by 3 and 5", () => {
    const result = exercise1(16);
    expect(result).toBe(16);
  });
});
