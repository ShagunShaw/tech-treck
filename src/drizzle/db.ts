import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema"
import postgres from "postgres";

const client= postgres(process.env.DATABASE_URL as string, { max: 10 })     // { max: 10 } is the max number of connections in a pool, the more the connection, the more fast is the db response in case of high traffic but also the cost is also high, even if your connections are idle at low traffic)
export const db= drizzle(client, { schema, logger: true })


/* 
postgres-js (the client we're using) manages connections automatically via a connection pool. The moment we do:
``` const client = postgres(process.env.DATABASE_URL as string)  ```
It creates a pool and connects lazily — meaning it connects when the first actual query runs, not before.
*/