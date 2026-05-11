import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from 'postgres'

const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 })     // { max: 1 } is the max number of connections in a pool, and for migrations, { max: 1 } is enough, because migrations are sequential and run only once; we need more connections in our db.ts file as that is our actual application runtime DB client, and may need more connections at times of high traffic

async function main() {
  try {    
    await migrate(drizzle(migrationClient), { 
      migrationsFolder: "./src/drizzle/migrations" 
    });

    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    await migrationClient.end();
  }
}

main()