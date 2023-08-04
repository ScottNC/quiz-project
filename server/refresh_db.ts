import { populateDatabase } from "./utils/database_populator";

async function f() {
  await populateDatabase();
}

f();