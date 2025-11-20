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
