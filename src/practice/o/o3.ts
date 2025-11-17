// 3) Уведомления
// Есть функция sendNotification(type, message) с вариантами "email" | "sms".
//
// Требование: добавь новые каналы (push, whatsapp)
// так, чтобы старый код не менять. SOLID принцип OCP.

interface Notification {
  send(message: string): void;
}
class EmailNotification implements Notification {
  send(message: string): void {
    console.log(`Email sent: ${message}`);
  }
}
class SmsNotification implements Notification {
  send(message: string): void {
    console.log(`Sms send: ${message}`);
  }
}

class PushNotification implements Notification {
  send(message: string) {
    console.log("push notification");
  }
}

class WhatsappNotification implements Notification {
  send(message: string) {
    console.log("whatsapp notification");
  }
}

function sendNotification(notification: Notification, message: string): void {
  notification.send(message);
}

sendNotification(new EmailNotification(), "some message");
sendNotification(new SmsNotification(), "some message");
sendNotification(new PushNotification(), "some message");
sendNotification(new WhatsappNotification(), "some message");
