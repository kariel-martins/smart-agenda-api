import { env } from "./src/config/env";
import { defineConfig } from "drizzle-kit"

const { database_url } = env()

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/schemas.ts',
    out: './drizzle',
    dbCredentials: {
        url: database_url,
        ssl: true
    }
})