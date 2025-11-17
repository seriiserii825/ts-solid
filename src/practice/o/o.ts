
// =============================
// Задача 2 — OrderProcessor (разные типы заказов)
// -----------------------------
// Есть обработчик заказов, который сейчас поддерживает только
// "physical" и "digital" через if.
// ЗАДАЧА: реализовать архитектуру, в которой можно легко
// добавлять новые типы заказов: "subscription", "preorder", "service",
// НЕ изменяя OrderProcessor (по OCP).

type Order = {
  id: number;
  type: "physical" | "digital";
  userId: number;
};

class OrderProcessor {
  process(order: Order) {
    if (order.type === "physical") {
      console.log("Создать накладную на доставку");
    }

    if (order.type === "digital") {
      console.log("Открыть доступ к скачиванию");
    }
  }
}

const orderProcessor = new OrderProcessor();
orderProcessor.process({ id: 1, type: "physical", userId: 3 });


// =============================
// Задача 3 — DocumentGenerator (разные типы документов)
// -----------------------------
// Сейчас генерируется только один тип документа — invoice.
// ЗАДАЧА: спроектировать решение, где можно добавлять новые типы
// документов: "contract", "offer", "serviceAct" и т.п.
// при этом НЕ менять существующий код DocumentGenerator.
// Подумать про общий интерфейс "документа" или "рендерера документа".

type InvoiceData = {
  invoiceNumber: string;
  total: number;
};

class DocumentGenerator {
  generate(type: "invoice", data: InvoiceData): string {
    if (type === "invoice") {
      return `Invoice #${data.invoiceNumber}, total: ${data.total}`;
    }
    return "";
  }
}

const docGen = new DocumentGenerator();
docGen.generate("invoice", { invoiceNumber: "A-1", total: 500 });


// =============================
// Задача 4 — WebhookHandler (разные провайдеры и события)
// -----------------------------
// Сейчас есть обработчик вебхуков только для Stripe и только для
// двух типов событий. Всё зашито в if.
// ЗАДАЧА: построить архитектуру, где можно:
//   - добавлять новых провайдеров (PayPal, YooKassa, Coinbase и т.п.)
//   - добавлять новые типы событий (refund, subscription_canceled и т.д.)
// при этом НЕ менять WebhookHandler при добавлении нового провайдера/типа.

type StripeEvent = {
  provider: "stripe";
  type: "payment_succeeded" | "payment_failed";
};

class WebhookHandler {
  handle(event: StripeEvent) {
    if (event.provider === "stripe") {
      if (event.type === "payment_succeeded") {
        console.log("Stripe payment succeeded");
      }
      if (event.type === "payment_failed") {
        console.log("Stripe payment failed");
      }
    }
  }
}

const wh = new WebhookHandler();
wh.handle({ provider: "stripe", type: "payment_succeeded" });


// =============================
// Задача 5 — Server + Middleware (расширяемая цепочка промежуточной логики)
// -----------------------------
// В сервере захардкожены шаги:
//  1) логирование
//  2) проверка авторизации
// ЗАДАЧА: спроектировать систему middleware так, чтобы можно было:
//   - легко добавлять новые шаги (rateLimit, auditLog, csrfProtection etc.)
//   - менять их порядок
//   - НЕ переписывать Server.handle при добавлении новых middleware.

type Request = { path: string; user?: { id: number } };
type Response = { send: (msg: string) => void };

class Server {
  handle(req: Request, res: Response) {
    console.log("log request:", req.path);

    if (!req.user) {
      res.send("Unauthorized");
      return;
    }

    console.log("User is authorized");
    res.send("OK");
  }
}

const server = new Server();
server.handle({ path: "/profile" }, { send: console.log });


// =============================
// Задача 6 — ShippingCostCalculator (расчёт доставки)
// -----------------------------
// Сейчас калькулятор поддерживает только два типа доставки через if.
// ЗАДАЧА: сделать систему, которая позволяет:
//   - добавлять новые методы доставки (pickup, same-day, express и т.п.)
//   - подключать сторонние курьерские сервисы (DHL, UPS, NovaPoshta)
// и при этом НЕ менять метод calculate при добавлении нового способа.

class ShippingCostCalculator {
  calculate(method: "local" | "international", weight: number): number {
    if (method === "local") return 5;
    if (method === "international") return weight * 4;
    return 0;
  }
}

const shippingCalc = new ShippingCostCalculator();
shippingCalc.calculate("local", 2);


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
