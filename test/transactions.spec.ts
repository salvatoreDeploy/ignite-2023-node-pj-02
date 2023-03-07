import { it, beforeAll, afterAll, describe, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app";

describe("Trasactions routes", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("Should be able to create a new transaction", async () => {
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

  it("Should be able to list all transactions", async () => {
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "New Transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTrasactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    //console.log(listTrasactionsResponse.body);

    expect(listTrasactionsResponse.body.transactions).toEqual([
      expect.objectContaining({ title: "New Transaction", amount: 5000 }),
    ]);
  });
});
