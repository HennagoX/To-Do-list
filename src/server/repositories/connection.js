import { Pool } from "pg";

export default function getDB() {
   const pool = new Pool({
      user: "todo_app",
      host: "localhost",
      database: "todo_list",
      password: "ricoboby112",
      port: 5432,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000
   })
   return pool;
}