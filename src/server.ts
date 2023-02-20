import fastify from "fastify";
import crypto from "node:crypto";
import { knex } from "./database";

const app = fastify();

app.get("/testedb", async () => {
  //const table = await knex("sqlite_schema").select("*");

  /* const transaction = await knex("transactions")
    .insert({
      id: crypto.randomUUID(),
      title: "Trasação de teste",
      amount: 1000,
    })
    .returning("*"); */

  //const transaction = await knex("transactions").select("*");

  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
