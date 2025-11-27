// Сделаем мини-приложение «обработка заказа в интернет-магазине».
// Есть заказ с товарами.
// Нужно посчитать цену с налогами и скидками.
// Сохранить заказ.
// Отправить письмо клиенту.
// Вывести отчёт.
// Сначала — плохой вариант (всё вперемешку, без SOLID).
// Потом — хороший вариант (SRP, OCP, LSP, ISP, DIP).
// ❌ Плохой код без SOLID
// ts
// Copy code
// // ==============================
// // ПЛОХОЙ ВАРИАНТ (без SOLID)
// // ==============================
type ProductType = "book" | "course" | "subscription";
interface OrderItem {
  type: ProductType;
  name: string;
  basePrice: number;
  quantity: number;
}
interface Order {
  id: string;
  customerEmail: string;
  items: OrderItem[];
  country: string;
  isPremiumCustomer: boolean;
}
class MegaOrderService {
  // имитация БД
  private db: Record<string, any> = {};
  private defaultTaxRate = 0.2;
  // ❌ Один огромный метод делает всё подряд:
  // - бизнес-логика скидок
  // - налоги
  // - сохранение в БД
  // - логирование
  // - отправка email
  // - генерация отчёта
  processOrder(order: Order): void {
    // ======== расчёт total (с кучей if'ов) ========
    let total = 0;
    for (const item of order.items) {
      let price = item.basePrice;
      // ❌ Скидки зашиты жёстко — нарушение OCP
      if (order.isPremiumCustomer) {
        price = price * 0.9; // -10%
      }
      if (item.type === "book") {
        price = price * 0.95; // -5% на книги
      }
      // ❌ Налоги тоже жёстко зашиты здесь
      if (order.country === "DE") {
        price = price * 1.19;
      } else if (order.country === "US") {
        price = price * 1.07;
      } else {
        price = price * (1 + this.defaultTaxRate);
      }
      total += price * item.quantity;
    }
    // ======== "логирование" ========
    console.log("Processing order:", order.id, "total =", total.toFixed(2));
    // ======== "сохранение в БД" ========
    this.db[order.id] = {
      ...order,
      total,
      processedAt: new Date().toISOString(),
    };
    // ======== "отправка email" ========
    const emailBody = `
    Hello!
    Your order ${order.id} has been processed.
      Total: ${total.toFixed(2)} €
    Thanks!
    `;
    console.log(`Sending email to ${order.customerEmail}:\n${emailBody}`);
    // ======== "генерация отчёта" ========
    console.log("=== SIMPLE REPORT ===");
    console.log("Total items:", order.items.length);
    console.log("Books:", order.items.filter((i) => i.type === "book").length);
    console.log("Courses:", order.items.filter((i) => i.type === "course").length);
    console.log("Subscriptions:", order.items.filter((i) => i.type === "subscription").length);
  }
  // ❌ Огромный интерфейс возможностей (ISP нарушен):
  //   сервис умеет ВСЁ, клиенты вынуждены зависеть от лишнего.
  exportAllDataToCsv(): void {
    console.log("Exporting ALL data to CSV from internal db...", this.db);
  }
  rebuildDatabaseSchema(): void {
    console.log("Dropping and recreating database schema... DANGEROUS");
  }
}
// ❌ Нарушение LSP: подкласс ведёт себя неожиданно для клиента
//   (например, не сохраняет заказ и не отправляет письмо).
class SilentOrderService extends MegaOrderService {
  // клиент ожидает "как обычно", а мы ломаем контракт
  processOrder(order: Order): void {
    console.log("Pretending to process order but actually doing NOTHING");
    // никакого сохранения, никаких email
  }
}
function badDemo() {
  const order: Order = {
    id: "ORD-1",
    customerEmail: "user@example.com",
    country: "DE",
    isPremiumCustomer: true,
    items: [
      { type: "book", name: "Clean Code", basePrice: 30, quantity: 1 },
      { type: "course", name: "Design Patterns", basePrice: 100, quantity: 1 },
    ],
  };
  const service = new MegaOrderService();
  service.processOrder(order);
  // Класс можно заменить на SilentOrderService,
  // и клиент "типа не заметит", но логика сломается.
  const silent = new SilentOrderService();
  silent.processOrder(order);
}
badDemo();
// Основные проблемы:
// SRP: MegaOrderService делает всё: расчёт, скидки, налоги, хранение, e-mail, отчёты, экспорт, миграции.
// OCP: любые новые скидки/налоги → лезем в processOrder и правим if-ы.
// LSP: SilentOrderService нарушает ожидания — «обрабатывает» заказ, но не делает того же, что базовый класс.
// ISP: клиенты получают монстра с лишними методами (rebuildDatabaseSchema и т.п.).
// DIP: везде жёстко зашиты детали (console.log, внутренняя db и т.д.).
