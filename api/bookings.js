import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  try {
    const dbUrl =
      process.env.STORAGE_URL ||
      process.env.DATABASE_URL ||
      process.env.POSTGRES_URL;

    if (!dbUrl) {
      return res.status(500).json({ error: 'База данных не подключена (STORAGE_URL / DATABASE_URL)' });
    }

    const sql = neon(dbUrl);

    // Автоматически создаем таблицу, если её ещё нет
    await sql`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        user_email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(20) NOT NULL,
        zone VARCHAR(50) NOT NULL,
        seats INT NOT NULL DEFAULT 1,
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const rows = await sql`SELECT * FROM bookings ORDER BY id DESC;`;
    return res.status(200).json(rows);
  } catch (error) {
    console.error('[CYBERHUB NEON] Ошибка получения бронирований:', error);
    return res.status(500).json({ error: 'Ошибка получения записей из базы' });
  }
}
