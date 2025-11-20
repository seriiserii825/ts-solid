// =========================
// Задача 6 — UI-Компонент кнопки
// -------------------------
// Твой дизайн-системный компонент ожидает интерфейс:
interface UIButtonProps {
  label: string;
  onClick(): void;
}

// Но старый компонент:
class LegacyButton {
  constructor(public text: string) {}
  handleClick() {
    console.log("Legacy button clicked");
  }
}

// ❗ ЗАДАЧА:
// Сделать адаптер между LegacyButton и UIButtonProps,
// чтобы можно было использовать LegacyButton внутри новой UI-системы.


// =========================
// Задача 7 — База данных
// -------------------------
// Есть абстрактный интерфейс репозитория:
interface IUserRepository {
  findById(id: number): Promise<{ id: number; name: string } | null>;
}

// И есть два "сырых" клиента:
// 1) MySQLClient:
class MySQLClient {
  query(sql: string): Promise<any[]> {
    return Promise.resolve([]);
  }
}

// 2) MongoClient:
class MongoClient {
  findOne(collection: string, filter: object): Promise<any | null> {
    return Promise.resolve(null);
  }
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - MySQLClient → IUserRepository
// - MongoClient → IUserRepository
// чтобы сервисы работали только с IUserRepository.


// =========================
// Задача 8 — Нотификации
// -------------------------
// Унифицированный интерфейс уведомлений:
interface Notifier {
  send(to: string, message: string): void;
}

// А есть два разных провайдера:
// 1) EmailService:
class EmailService {
  sendEmail(recipient: string, body: string) {/*...*/}
}

// 2) SmsService:
class SmsService {
  sendSms(phone: string, text: string) {/*...*/}
}

// ❗ ЗАДАЧА:
// Сделать адаптеры EmailService и SmsService под Notifier,
// чтобы можно было в зависимости от настроек подменять реализацию.


// =========================
// Задача 9 — Видео-плеер
// -------------------------
// Новый интерфейс видеоплеера:
interface VideoPlayer {
  play(url: string): void;
}

// Старый HTML5 плеер:
class Html5Player {
  playFile(fileUrl: string) {/*...*/}
}

// Сторонняя библиотека:
class ThirdPartyPlayer {
  startStreaming(streamUrl: string) {/*...*/}
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - Html5Player → VideoPlayer
// - ThirdPartyPlayer → VideoPlayer
// и показать, как клиентский код работает только через VideoPlayer.


// =========================
// Задача 10 — Конвертер единиц измерения
// -------------------------
// Клиент ожидает интерфейс:
interface DistanceProvider {
  getDistanceInKm(): number;
}

// А есть разные источники:
// 1) Источник A: возвращает метры
class MetersSource {
  getMeters(): number {
    return 1000;
  }
}

// 2) Источник B: возвращает мили
class MilesSource {
  getMiles(): number {
    return 1;
  }
}

// ❗ ЗАДАЧА:
// Сделать два адаптера:
// - MetersSource → DistanceProvider
// - MilesSource → DistanceProvider
// с корректным пересчётом в километры.
// =========================
