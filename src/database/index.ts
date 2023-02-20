import { knex as setupKnex, Knex } from "knex";

if (!process.env.DATABASE_URL_DEV) {
  throw new Error("DATABASE_URL_DEV not found");
}

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: process.env.DATABASE_URL_DEV,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
};

export const knex = setupKnex(config);
