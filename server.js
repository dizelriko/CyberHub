import express from 'express';
import nodemailer from 'nodemailer';
import mariadb from 'mariadb';

try {
  process.loadEnvFile('.env');
} catch {
  // .env не найден — используем системные переменные окружения
}

const PORT = Number(process.env.PORT) || 5000;

// Подключение к MariaDB / MySQL
const dbPool = mariadb.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'CyberHub',
  connectionLimit: 5,
});

// Автоматическая инициализация таблицы при старте сервера
(async () => {
  let conn;
  try {
    conn = await dbPool.getConnection();
    await conn.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_name VARCHAR(100) NOT NULL,
        user_email VARCHAR(150) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        booking_date DATE NOT NULL,
        booking_time VARCHAR(20) NOT NULL,
        zone VARCHAR(50) NOT NULL,
        seats INT NOT NULL DEFAULT 1,
        comment TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('[CYBERHUB DB] Успешное подключение к MariaDB. Таблица "bookings" готова к работе.');
  } catch (err) {
    console.error('[CYBERHUB DB] Внимание: не удалось подключиться к MariaDB:', err.message);
    console.error('[CYBERHUB DB] Проверьте пароль DB_PASSWORD и запущен ли сервер MariaDB в .env');
  } finally {
    if (conn) conn.release();
  }
})();

const app = express();
app.use(express.json());

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// API получения списка всех записей бронирования (для проверки)
app.get('/api/bookings', async (req, res) => {
  try {
    const rows = await dbPool.query('SELECT * FROM bookings ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('[CYBERHUB DB] Ошибка при чтении из базы данных:', error);
    res.status(500).json({ error: 'Не удалось получить записи из базы данных' });
  }
});

// API создания нового бронирования
app.post('/api/create-booking', async (req, res) => {
  try {
    const {
      userName,
      userEmail,
      phone,
      date,
      time,
      zone = 'STANDARD',
      seats = 1,
      comment = '',
    } = req.body ?? {};

    if (!userName || typeof userName !== 'string' || !userName.trim()) {
      return res.status(400).json({ error: 'Пожалуйста, укажите имя' });
    }

    if (!userEmail || typeof userEmail !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      return res.status(400).json({ error: 'Пожалуйста, укажите корректный email' });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ error: 'Пожалуйста, укажите номер телефона' });
    }

    if (!date || !time) {
      return res.status(400).json({ error: 'Пожалуйста, выберите дату и время' });
    }

    const timeMatch = String(time).match(/^(\d{1,2}):(\d{2})/);
    if (!timeMatch) {
      return res.status(400).json({ error: 'Пожалуйста, выберите корректное время' });
    }

    const slotH = parseInt(timeMatch[1], 10);
    const slotM = parseInt(timeMatch[2], 10);
    const bookingDate = new Date(`${date}T${String(slotH).padStart(2, '0')}:${String(slotM).padStart(2, '0')}:00`);

    if (!isNaN(bookingDate.getTime()) && bookingDate.getTime() < Date.now() - 5 * 60 * 1000) {
      return res.status(400).json({ error: 'Выбранное время уже прошло. Пожалуйста, выберите актуальное время.' });
    }

    const safeUserName = escapeHtml(userName.trim());
    const safeZone = escapeHtml(zone);
    const safeDate = escapeHtml(date);
    const safeTime = escapeHtml(time);
    const safeSeats = Number(seats) || 1;
    const safePhone = escapeHtml(phone.trim());
    const safeComment = escapeHtml(comment.trim());

    // 1. СОХРАНЕНИЕ В БАЗУ ДАННЫХ MariaDB
    let dbInsertSuccess = false;
    try {
      await dbPool.query(
        `INSERT INTO bookings (user_name, user_email, phone, booking_date, booking_time, zone, seats, comment)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userName.trim(),
          userEmail.trim(),
          phone.trim(),
          date,
          time,
          zone,
          safeSeats,
          comment.trim() || null,
        ]
      );
      dbInsertSuccess = true;
      console.log(`[CYBERHUB DB] Заявка успешно записана в базу данных CyberHub.bookings: ${safeUserName} (${safeDate} ${safeTime})`);
    } catch (dbErr) {
      console.error('[CYBERHUB DB] Ошибка записи в MariaDB:', dbErr.message);
    }

    // 2. ОТПРАВКА EMAIL ЧЕРЕЗ NODEMAILER
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_PASS;

    if (user && pass) {
      try {
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"CYBERHUB" <${user}>`,
          to: `${userEmail}, ${user}`,
          subject: `🎮 Подтверждение бронирования в CYBERHUB (${safeZone})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 560px; margin: 0 auto; background-color: #04111a; border: 1px solid #169cff; border-radius: 14px; overflow: hidden; color: #ffffff; padding: 28px;">
              <div style="text-align: center; border-bottom: 1px solid rgba(91,132,155,0.25); padding-bottom: 20px; margin-bottom: 24px;">
                <h1 style="margin: 0; color: #ffffff; font-size: 26px; letter-spacing: 2px;">CYBER<span style="color: #35f56c;">HUB</span></h1>
                <p style="margin: 6px 0 0; color: #8b9aa4; font-size: 11px; letter-spacing: 3px;">КОМПЬЮТЕРНЫЙ КЛУБ</p>
              </div>

              <h2 style="color: #35f56c; margin: 0 0 12px; font-size: 20px;">Здравствуйте, ${safeUserName}!</h2>
              <p style="color: #c5d0d6; font-size: 15px; line-height: 1.55; margin: 0 0 20px;">
                Ваша заявка на бронирование в <b>CYBERHUB</b> успешно принята. Мы зарезервировали место и ждём вас!
              </p>

              <div style="background-color: #071722; border: 1px solid rgba(53,245,108,0.3); border-radius: 10px; padding: 18px 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 12px; font-size: 13px; color: #8c9aa3; text-transform: uppercase; letter-spacing: 1.5px; font-weight: bold;">Детали бронирования:</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #e1e7ec;">
                  <tr>
                    <td style="padding: 7px 0; color: #8c9aa3;">Игровая зона:</td>
                    <td style="padding: 7px 0; text-align: right; font-weight: bold; color: #35f56c;">${safeZone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; color: #8c9aa3;">Дата и время:</td>
                    <td style="padding: 7px 0; text-align: right; font-weight: bold;">${safeDate} в ${safeTime}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; color: #8c9aa3;">Количество мест:</td>
                    <td style="padding: 7px 0; text-align: right; font-weight: bold;">${safeSeats}</td>
                  </tr>
                  <tr>
                    <td style="padding: 7px 0; color: #8c9aa3;">Телефон:</td>
                    <td style="padding: 7px 0; text-align: right; font-weight: bold;">${safePhone}</td>
                  </tr>
                  ${safeComment ? `
                  <tr>
                    <td style="padding: 7px 0; color: #8c9aa3;">Пожелания:</td>
                    <td style="padding: 7px 0; text-align: right;">${safeComment}</td>
                  </tr>` : ''}
                  <tr>
                    <td style="padding: 10px 0 0; color: #8c9aa3; border-top: 1px solid rgba(91,132,155,0.2);">Статус заявки:</td>
                    <td style="padding: 10px 0 0; text-align: right; font-weight: bold; color: #35f56c; border-top: 1px solid rgba(91,132,155,0.2);">Забронировано</td>
                  </tr>
                </table>
              </div>

              <div style="background-color: #020b12; border: 1px solid rgba(91,132,155,0.2); border-radius: 8px; padding: 14px 18px; margin-bottom: 24px; font-size: 13px; color: #a6b1b8;">
                <p style="margin: 0 0 6px;"><strong style="color: #fff;">📍 Адрес:</strong> г. Алматы, ул. Достык 108</p>
                <p style="margin: 0 0 6px;"><strong style="color: #fff;">⏰ Режим работы:</strong> Ежедневно 24/7 (круглосуточно)</p>
                <p style="margin: 0;"><strong style="color: #fff;">📞 Телефон:</strong> +7 (708) 457-51-70</p>
              </div>

              <hr style="border: none; border-top: 1px solid rgba(91,132,155,0.2); margin: 20px 0;" />
              <p style="font-size: 12px; color: #6d7f8a; text-align: center; margin: 0;">
                Письмо сформировано автоматически приложением CYBERHUB.
              </p>
            </div>
          `,
        });

        console.log(`[CYBERHUB] Письмо о бронировании для ${userEmail} успешно отправлено.`);
      } catch (mailErr) {
        console.error('[CYBERHUB] Ошибка при отправке почты:', mailErr);
      }
    }

    return res.status(200).json({
      success: true,
      dbSaved: dbInsertSuccess,
      message: 'Бронирование успешно создано!',
    });
  } catch (error) {
    console.error('[CYBERHUB] Общая ошибка бронирования:', error);
    return res.status(500).json({ error: 'Не удалось обработать заявку' });
  }
});

app.listen(PORT, () => {
  console.log(`[CYBERHUB Backend] Сервер успешно запущен на http://localhost:${PORT}`);
});
