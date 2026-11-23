import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import path from "path";
import * as schema from "./schema";

const sqlite = new Database(path.join(process.cwd(), "sqlite.db"), {
  readonly: process.env.VERCEL === "1",
  fileMustExist: true,
});
export const db = drizzle(sqlite, { schema });