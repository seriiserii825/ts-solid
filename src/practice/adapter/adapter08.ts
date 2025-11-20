// =========================
// Задача 8 — Нотификации
// -------------------------
// Унифицированный интерфейс уведомлений:
interface Notifier {
  send(to: string, message: string): void;
}

// А есть два разных провайдера:
// 1) EmailService:
class EmailService implements IEmailService {
  sendEmail(recipient: string, body: string): void {
    console.log(`Email sent to ${recipient}: ${body}`);
  }
}

interface IEmailService {
  sendEmail(recipient: string, body: string): void;
}

// 2) SmsService:
class SmsService implements ISmsService {
  sendSms(phone: string, text: string): void {
    console.log(`SMS sent to ${phone}: ${text}`);
  }
}

interface ISmsService {
  sendSms(phone: string, text: string): void;
}

// ❗ ЗАДАЧА:
// Сделать адаптеры EmailService и SmsService под Notifier,
// чтобы можно было в зависимости от настроек подменять реализацию.

class EmailServiceAdapter implements Notifier {
  constructor(private email_service: IEmailService) {}
  send(to: string, message: string) {
    this.email_service.sendEmail(to, message);
  }
}

class SmsServiceAdapter implements Notifier {
  constructor(private sms_service: ISmsService) {}

  send(phone: string, message: string) {
    this.sms_service.sendSms(phone, message);
  }
}

const email_notifier: Notifier = new EmailServiceAdapter(new EmailService());
email_notifier.send("test@mail.com", "Hello via Email!");
const sms_notifier: Notifier = new SmsServiceAdapter(new SmsService());
sms_notifier.send("+1234567890", "Hello via SMS!");

