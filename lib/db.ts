import { neon } from "@neondatabase/serverless";

export function getDb() {
  return neon(process.env.DATABASE_URL!);
}

export async function initDb() {
  const sql = getDb();
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id          SERIAL PRIMARY KEY,
      "locationId" TEXT    NOT NULL,
      "authorName" TEXT    NOT NULL,
      rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
      body        TEXT    NOT NULL,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_reviews_locationId ON reviews ("locationId")
  `;
}
