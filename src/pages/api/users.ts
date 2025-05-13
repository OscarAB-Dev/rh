import type { APIRoute } from 'astro';
import { db, Users } from 'astro:db';

export const GET: APIRoute = async () => {
  const users = await db.select().from(Users);
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
  });
};