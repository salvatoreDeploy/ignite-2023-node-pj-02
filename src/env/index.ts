import "dotenv/config";

import { string, z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["developement", "test", "production"])
    .default("production"),
  DATABASE_URL_DEV: z.string(),
  PORT: z.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviroment variables!", _env.error.format());

  throw new Error("Invalid enviroment variables!");
}

export const env = _env.data;