import { defineMiddleware, sequence } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const authMiddleware = defineMiddleware(async ({ request, redirect }, next) => {
  const session = await getSession(request);
  const url = new URL(request.url);

  // Proteger rutas que comienzan con /dashboard
  if (url.pathname.startsWith('/dashboard')) {
    if (!session) {
      return redirect('/');
    }
  }
  
  return next();
});

export const onRequest = sequence(authMiddleware);