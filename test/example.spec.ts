import { test, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from "../src/app";

beforeAll(async () => {
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

test("The user should be able to create a new transaction", async () => {
  // Fazer a chamada HTTP para criar uma nova transaçaõ

  await request(app.server)
    .post("/transactions")
    .send({
      title: "New Transaction",
      amount: 5000,
      type: "credit",
    })
    // Validação
    .expect(201);
});
