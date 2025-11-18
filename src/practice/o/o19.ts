// =============================
// Задача 9 — OrderNotificationService (уведомления по каналам)
// -----------------------------
// Сейчас есть только email и всего 3 статуса.
// ЗАДАЧА: сделать расширяемую систему уведомлений, чтобы:
//   - можно было добавлять новые каналы (SMS, Telegram, push и др.)
//   - можно было добавлять новые статусы (canceled, refunded)
//   - НЕ менять существующий метод send при расширении.

interface NotificationChannel {
  send(status: string): void;
}

class EmailNotificationChannel implements NotificationChannel {
  send(status: string) {
    console.log(`EMAIL → Order ${status}`);
  }
}

class SMSNotificationChannel implements NotificationChannel {
  send(status: string) {
    console.log(`SMS → Order ${status}`);
  }
}

class OrderNotificationService {
  private channels: { [key: string]: NotificationChannel } = {
    email: new EmailNotificationChannel(),
    sms: new SMSNotificationChannel(),
    // Можно добавлять новые каналы здесь
  };

  send(status: string, channelType: string) {
    const channel = this.channels[channelType];
    if (channel) {
      channel.send(status);
    } else {
      console.log(`Channel ${channelType} not supported.`);
    }
  }
}


const notifier = new OrderNotificationService();
notifier.send("paid", "email");


