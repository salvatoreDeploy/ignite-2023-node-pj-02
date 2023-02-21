import { FastifyInstance } from "fastify";
import crypto from "node:crypto";

import { z } from "zod";
import { knex } from "../database";

export async function transactionsRoute(app: FastifyInstance) {
  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    await knex("transactions").insert({
      id: crypto.randomUUID(),
      title,
      amount: type === "credit" ? amount : amount * -1,
    });

    return reply.status(201).send({ message: "successful transaction" });
  });
}
