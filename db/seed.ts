import { db, Users } from 'astro:db';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export default async function () {
  const hashedPassword = await bcrypt.hash('admin123', 10); // Contraseña inicial: admin123
  await db.insert(Users).values({
    id: uuidv4(),
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
    createdAt: new Date(),
  });
}
//HOLA