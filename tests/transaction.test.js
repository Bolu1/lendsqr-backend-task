import request from "supertest";
const app = require("../src/app");

jest.useRealTimers();

// get auth token
var token;
beforeAll(async () => {
  const response = await request(app).post("/api/user/signin").send({
    email: "test@gmail.com",
    password: "123456",
  }, 100000);
  token = response.body.data.token;
});

describe("POST /api/transaction/deposit", () => {
  describe("Deposit", () => {
    test("should return 200", async () => {
      const response = await request(app).post("/api/user/signin").send({
        amount: 100,
      });
      expect(response.statusCode).toBe(200);
    }, 100000);
  });
});

describe("POST /api/transaction/deposit", () => {
  describe("Deposit over the maximum limit", () => {
    test("should return 400", async () => {
      const response = await await request(app)
        .post("/api/transaction/deposit")

        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 100000000,
        });
      expect(response.statusCode).toBe(400);
    }, 100000);
  });
});

describe("POST /api/transaction/withdraw", () => {
  describe("Withdrawal", () => {
    test("should return 200", async () => {
      const response = await await request(app)
        .post("/api/transaction/withdraw")

        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 100,
        });
      expect(response.statusCode).toBe(200);
    }, 100000);
  });
});

describe("POST /api/transaction/withdraw", () => {
  describe("Withdrawal over the maximum limit", () => {
    test("should return 400", async () => {
      const response = await await request(app)
        .post("/api/transaction/withdraw")

        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 10000000,
        });
      expect(response.statusCode).toBe(400);
    }, 100000);
  });
});

describe("POST /api/transaction/transfer", () => {
  describe("Transfer below the limit", () => {
    test("should return 400", async () => {
      const response = await await request(app)
        .post("/api/transaction/transfer")

        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 10,
          creditor: 8234255717
        });
      expect(response.statusCode).toBe(400);
    }, 100000);
  });
});

describe("POST /api/transaction/transfer", () => {
  describe("Transfer above the limit", () => {
    test("should return 400", async () => {
      const response = await await request(app)
        .post("/api/transaction/transfer")

        .set("Authorization", `Bearer ${token}`)
        .send({
          amount: 100000000,
          creditor: 8234255717
        });
      expect(response.statusCode).toBe(400);
    }, 100000);
  });
});
