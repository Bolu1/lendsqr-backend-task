// import request from "supertest";
// const app = require("../src/app");

// jest.useRealTimers();

// // get auth token
// var token: string;
// beforeAll(async () => {
//   const response = await request(app).post("/api/user/signin").send({
//     email: "test@gmail.com",
//     password: "123456",
//   }, 100000);
//   console.log(response);
//   token = response.body.data.token;
// });

// describe("POST /api/transaction/deposit", () => {
//   describe("Get directories", () => {
//     test("should return 200", async () => {
//       const response = await request(app).post("/api/user/signin").send({
//         amount: 100,
//       });
//       expect(response.statusCode).toBe(200);
//     }, 100000);
//   });
// });

// describe("POST /api/transaction/deposit", () => {
//   describe("Get directories", () => {
//     test("should return 400", async () => {
//       const response = await await request(app)
//         .post("/api/transaction/deposit")

//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           amount: 100000000,
//         });
//       expect(response.statusCode).toBe(400);
//     }, 100000);
//   });
// });

// describe("POST /api/transaction/withdraw", () => {
//   describe("Get directories", () => {
//     test("should return 400", async () => {
//       const response = await await request(app)
//         .post("/api/transaction/withdraw")

//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           amount: 100,
//         });
//       expect(response.statusCode).toBe(200);
//     }, 100000);
//   });
// });

// describe("POST /api/transaction/withdraw", () => {
//   describe("Get directories", () => {
//     test("should return 400", async () => {
//       const response = await await request(app)
//         .post("/api/transaction/withdraw")

//         .set("Authorization", `Bearer ${token}`)
//         .send({
//           amount: 10000000,
//         });
//       expect(response.statusCode).toBe(400);
//     }, 100000);
//   });
// });
