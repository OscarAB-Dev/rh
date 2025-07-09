import { defineDb, defineTable, column } from 'astro:db';

// https://astro.build/db/config

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true, unique: true }),
    usuario: column.text({unique: true}),
    password: column.text(),
    role: column.text({ default: 'user' }),
    createdAt: column.date({ default: new Date()}),
  }
})

export default defineDb({
  tables: { Users }
});
//hola men