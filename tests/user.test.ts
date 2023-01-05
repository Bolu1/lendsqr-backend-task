import request from "supertest";
const app = require("../src/app");

jest.useRealTimers();

describe("POST /api/user/signup", () => {
  describe("Signup with details which are in use", () => {
    test("should return 409", async () => {
      const response = await await request(app)
        .post("/api/user/signup")
        .send({
          email: "tests@gmail.com",
          phone: "0801",
          firstName: "Moff",
          lastName: "Gideon",
          password: "123456",
        })
      expect(response.statusCode).toBe(409);
    }, 100000);
  });
});

describe("POST /api/user/signup", () => {
    describe("Signup with incomplete details", () => {
      test("should return 400", async () => {
        const response = await await request(app)
          .post("/api/user/signup")
          .send({
            firstName: "Moff",
            lastName: "Gideon",
            password: "123456"
          })
        expect(response.statusCode).toBe(400);
      }, 100000);
    });
  });


describe("POST /api/user/signin", () => {
    describe("Signin with right details", () => {
      test("should return 200", async () => {
        const response = await await request(app)
        .post("/api/user/signin")
        .send({
          email: "tests@gmail.com",
          password: "123456",
        })
        expect(response.statusCode).toBe(200);
      }, 100000);
    });
  });

describe("POST /api/user/signin", () => {
    describe("Signin with wrong details", () => {
      test("should return 400", async () => {
        const response = await await request(app)
          .post("/api/user/signin")
          .send({
            email: "tests@gmail.com",
            password: "123456876",
          })
        expect(response.statusCode).toBe(400);
      }, 100000);
    });
  });