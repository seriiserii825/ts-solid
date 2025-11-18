// =============================
// Задача 7 — MessageBuilder (локализация/многоязычность)
// -----------------------------
// Сейчас сообщения поддерживают только "en" и "it" через if.
// ЗАДАЧА: сделать архитектуру, в которой можно:
//   - легко добавлять новые локали (ru, de, fr и т.д.)
//   - переиспользовать разные шаблоны (приветствие, напоминания и т.п.)
//   - НЕ менять MessageBuilder при добавлении новой локали.

class MessageBuilder {
  build(locale: "en" | "it", name: string) {
    if (locale === "en") {
      return `Hello, ${name}!`;
    }
    if (locale === "it") {
      return `Ciao, ${name}!`;
    }
  }
}

const msgBuilder = new MessageBuilder();
msgBuilder.build("en", "Sergio");


// =============================
// Задача 8 — validateCart (правила валидации корзины)
// -----------------------------
// Сейчас все правила валидации закодированы внутри функции.
// ЗАДАЧА: спроектировать систему "правил валидации",
// где можно подключать/отключать/добавлять новые правила:
//   - минимальная сумма заказа
//   - несовместимые товары
//   - ограничения по странам
//   - условие "только для зарегистрированных"
// при этом НЕ менять тело функции validateCart.

type Cart = { total: number; items: string[] };

function validateCart(cart: Cart): string[] {
  const errors: string[] = [];

  if (cart.total < 10) {
    errors.push("Минимальная сумма заказа 10€");
  }

  if (cart.items.includes("alcohol") && cart.items.includes("medicine")) {
    errors.push("Нельзя покупать вместе алкоголь и лекарства");
  }

  return errors;
}

validateCart({ total: 5, items: ["alcohol", "medicine"] });


// =============================
// Задача 9 — OrderNotificationService (уведомления по каналам)
// -----------------------------
// Сейчас есть только email и всего 3 статуса.
// ЗАДАЧА: сделать расширяемую систему уведомлений, чтобы:
//   - можно было добавлять новые каналы (SMS, Telegram, push и др.)
//   - можно было добавлять новые статусы (canceled, refunded)
//   - НЕ менять существующий метод send при расширении.

class OrderNotificationService {
  send(status: "paid" | "shipped" | "delivered", channel: "email") {
    if (channel === "email") {
      console.log(`EMAIL → Order ${status}`);
    }
  }
}

const notifier = new OrderNotificationService();
notifier.send("paid", "email");


// =============================
// Задача 10 — AccessControl (ACL, роли и права)
// -----------------------------
// Сейчас есть две роли и три действия, логика зашита в if.
// ЗАДАЧА: сделать систему прав, в которой можно:
//   - добавлять новые роли (guest, editor, manager и т.д.)
//   - добавлять новые действия (export, archive, restore и др.)
//   - НЕ переписывать метод can при добавлении новых ролей/действий.

type Role = "admin" | "user";

class AccessControl {
  can(role: Role, action: "read" | "write" | "delete"): boolean {
    if (role === "admin") return true;
    if (role === "user") return action === "read";
    return false;
  }
}

const acl = new AccessControl();
acl.can("admin", "delete");
