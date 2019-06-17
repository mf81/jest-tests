const lib = require("../lib");
const db = require("../db");
const email = require("../mail");

describe("absolute", () => {
  it("return positive number if imput is positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("return positive number if imput is negatvie", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("return 0 number if imput is 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("return right string", () => {
    const result = lib.greet("Maciej");
    expect(result).toMatch(/Maciej/);
  });
});

describe("getCurrencies", () => {
  it("return all currencies", () => {
    const result = lib.getCurrencies();
    expect(result).toEqual(expect.arrayContaining(["USD", "AUD", "EUR"]));
  });
});

describe("getProduct", () => {
  it("return all currencies", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("getProduct", () => {
  it("return all currencies", () => {
    const result = lib.getProduct(1);
    expect(result).toMatchObject({ id: 1, price: 10 });
    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("throw if user name is false", () => {
    const arg = [null, undefined, NaN, "", 0, false];
    arg.forEach(x => {
      expect(() => {
        lib.registerUser(a);
      });
    });
  });

  it("return valid user name", () => {
    const result = lib.registerUser("Maciek");
    expect(result).toMatchObject({ username: "Maciek" });
    //OR
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applayDiscount", () => {
  it("MOCK Function return fake data from db", () => {
    db.getCustomerSync = function(customerId) {
      console.log("Fake db function - connected...");
      return { id: customerId, points: 20 };
    };
  });

  const order = { customerId: 1, totalPrice: 10 };
  lib.applyDiscount(order);
  expect(order.totalPrice).toBe(9);
});

// timeless aprouch
describe("notifyCustomer", () => {
  it("send email to customer", () => {
    db.getCustomerSync = function(customerId) {
      console.log("Fake db function - connected...");
      return { email: "a" };
    };

    let mailSent = false;
    email.send = function(email, message) {
      mailSent = true;
    };

    lib.notifyCustomer({ customerId: 1 });

    expect(mailSent).toBe(true);
  });
});

describe("notifyCustomer by jest.fn", () => {
  it("send email to customer", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });

    email.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });

    expect(email.send).toHaveBeenCalled();
    expect(email.send.mock.calls[0][0]).toBe("a");
    expect(email.send.mock.calls[0][1]).toMatch(/order/);
  });
});
