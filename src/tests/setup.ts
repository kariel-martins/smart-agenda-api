import { db } from "../database/Client";
import { businesses, refresh_tokens, users } from "../database/Schemas";

beforeAll(async () => {
   console.log('Testes iniciados');
  await db.delete(refresh_tokens);
  await db.delete(users);
  await db.delete(businesses);
});


afterAll(() => {
  console.log('Testes finalizados');
});