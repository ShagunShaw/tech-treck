// recheck all this from documentation once

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator"
import postgres from 'postgres'

const migrationClient = postgres(process.env.DATABASE_URL as string, { max: 1 })

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