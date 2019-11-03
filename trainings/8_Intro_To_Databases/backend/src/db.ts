import { Pool, QueryResult } from "pg";

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_DATABASE || "todos"
});

export const query = async (
  text: string,
  params?: (string | undefined)[]
): Promise<QueryResult> => {
  return pool.query(text, params);
};
