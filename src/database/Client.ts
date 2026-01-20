import { Pool } from "pg";
import { env } from "../config/env"
import { drizzle } from "drizzle-orm/node-postgres";

const { database_url } = env()

const pool = new Pool({
    connectionString: database_url
})

export const db = drizzle(pool)