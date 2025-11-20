// ===============================
// 1) Уведомления + каналы отправки
// -------------------------------
// Абстракция: Notification
// Реализация: Email / SMS / Telegram
// ЗАДАЧА: Сделать Bridge так, чтобы разные уведомления (Success, Warning)
// могли отправляться через любой канал.

interface Channel {
  send(message: string): void;
}

class EmailChannel implements Channel {
  send(message: string) {
    console.log("EMAIL:", message);
  }
}

class SmsChannel implements Channel {
  send(message: string) {
    console.log("SMS:", message);
  }
}

abstract class Notification {
  constructor(protected channel: Channel){}
  abstract notify(text: string): void
}

class WarningNotification extends Notification {
  notify(text: string) {
    this.channel.send("⚠ WARNING: " + text);
  }
}

class SuccessNotification extends Notification {
  notify(text: string) {
    this.channel.send("✔ SUCCESS: " + text);
  }
}


const email = new EmailChannel();
const sms = new SmsChannel();

new WarningNotification(email).notify("Low disk");
new SuccessNotification(sms).notify("Payment received");
