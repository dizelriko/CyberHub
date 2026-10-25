CREATE DATABASE IF NOT EXISTS CyberHub DEFAULT CHARACTER SET = 'utf8mb4';
USE CyberHub;

CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_name VARCHAR(100) NOT NULL COMMENT 'Имя клиента',
  user_email VARCHAR(150) NOT NULL COMMENT 'Email для подтверждения',
  phone VARCHAR(50) NOT NULL COMMENT 'Номер телефона',
  booking_date DATE NOT NULL COMMENT 'Дата бронирования (ГГГГ-ММ-ДД)',
  booking_time VARCHAR(20) NOT NULL COMMENT 'Время бронирования',
  zone VARCHAR(50) NOT NULL COMMENT 'Игровая зона (STANDARD, VIP, BOOTCAMP, PS5 ZONE)',
  seats INT NOT NULL DEFAULT 1 COMMENT 'Количество мест',
  comment TEXT NULL COMMENT 'Пожелания к бронированию',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'Дата и время создания записи'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
