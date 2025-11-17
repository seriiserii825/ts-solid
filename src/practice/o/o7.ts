import fs from 'fs';
// 7) Логирование
// Есть Logger с жёстким методом logToConsole.
//
// Требование: расширить логирование:
//
// в файл
//
// в базу
//
// в Telegram-бот
// Не меняя старый класс.

interface LogMethod {
  log(message: string): void;
}

class Console implements LogMethod {
  log(message: string) {
    console.log(`${message}`);
  }
}

class File implements LogMethod {
  log(message: string) {
    fs.writeFileSync('log.txt', message + '\n', { flag: 'a' });
  }
}

class Database implements LogMethod {
  log(message: string) {
    // Симуляция записи в базу данных
    console.log(`Logged to database: ${message}`);
  }
}
