// auth.config.mjs
import CredentialsProvider from '@auth/core/providers/credentials';
import { defineConfig } from 'auth-astro';
import { db, Users } from 'astro:db';
import bcrypt from 'bcrypt';

export default defineConfig({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // Buscar usuario en Astro DB
        const [user] = await db
          .select()
          .from(Users)
          .where({ username: credentials.username });

        if (!user) {
          return null;
        }

        // Verificar contraseña
        const isValidPassword = await bcrypt.compare(credentials.password, user.password);
        if (!isValidPassword) {
          return null;
        }

        // Devolver objeto de usuario para la sesión
        return {
          id: user.id,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  secret: import.meta.env.AUTH_SECRET, // Variable de entorno para firmar tokens
});