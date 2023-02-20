import fastify from "fastify";
import { knex } from "./database";

const app = fastify();

app.get("/testedb", async () => {
  const table = await knex("sqlite_schema").select("*");

  return table;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server Running!");
  });
