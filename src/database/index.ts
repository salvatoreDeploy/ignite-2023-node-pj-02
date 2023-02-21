import { knex as setupKnex, Knex } from "knex";
import { env } from "../env";

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: env.DATABASE_URL_DEV,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./src/database/migrations",
  },
};

export const knex = setupKnex(config);
