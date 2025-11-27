// ✅ Хороший код с SOLID
// Теперь перепишем:
// SRP: отдельные классы для скидок, налогов, хранения, уведомлений, логов, отчётов.
// OCP: скидки/налоги — стратегии, можно добавлять новые, не трогая CheckoutService.
// LSP: реализуем интерфейсы так, чтобы их можно было честно подменять.
// ISP: маленькие целевые интерфейсы (Logger, DiscountPolicy, TaxPolicy, OrderRepository, Notifier, ReportGenerator).
// DIP: CheckoutService зависит от интерфейсов, а не от конкретных реализаций.
// ts
// Copy code
// ==============================
// ХОРОШИЙ ВАРИАНТ (с SOLID)
// ==============================
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
interface ProcessedItem extends OrderItem {
  priceAfterDiscount: number;
  priceWithTax: number;
  lineTotal: number;
}
interface ProcessedOrder extends Order {
  items: ProcessedItem[];
  total: number;
  processedAt: string;
}
// ---------- ISP: маленькие интерфейсы ----------
interface Logger {
  log(message: string): void;
}
interface DiscountPolicy {
  // возвращает цену за единицу после всех скидок
  apply(order: Order, item: OrderItem): number;
}
interface TaxPolicy {
  // применяет налог к цене за единицу
  apply(country: string, price: number): number;
}
interface OrderRepository {
  save(order: ProcessedOrder): void;
  getAll(): ProcessedOrder[];
}
interface Notifier {
  sendOrderConfirmation(order: ProcessedOrder): void;
}
interface ReportGenerator {
  printDailyReport(orders: ProcessedOrder[]): void;
}
// ---------- SRP: отдельные реализации ----------
// Логер
class ConsoleLogger implements Logger {
  private prefix: string;
  constructor(prefix: string = "[LOG]") {
    this.prefix = prefix;
  }
  log(message: string): void {
    console.log(`${this.prefix} ${message}`);
  }
}
// OCP: отдельные скидки
class PremiumCustomerDiscount implements DiscountPolicy {
  private discount: number;
  constructor(discount: number = 0.1) {
    this.discount = discount;
  }
  apply(order: Order, item: OrderItem): number {
    let price = item.basePrice;
    if (order.isPremiumCustomer) {
      price = price * (1 - this.discount);
    }
    return price;
  }
}
class BookCategoryDiscount implements DiscountPolicy {
  private discount: number;
  constructor(discount: number = 0.05) {
    this.discount = discount;
  }
  apply(_order: Order, item: OrderItem): number {
    if (item.type === "book") {
      return item.basePrice * (1 - this.discount);
    }
    return item.basePrice;
  }
}
// OCP: можно комбинировать несколько скидок
class CompositeDiscountPolicy implements DiscountPolicy {
  private policies: DiscountPolicy[];
  constructor(policies: DiscountPolicy[]) {
    this.policies = policies;
  }
  apply(order: Order, item: OrderItem): number {
    // применяем скидки по очереди
    let price = item.basePrice;
    for (const policy of this.policies) {
      const tempItem: OrderItem = {
        ...item,
        basePrice: price,
      };
      price = policy.apply(order, tempItem);
    }
    return price;
  }
}
// OCP: политика налогов
class CountryTaxPolicy implements TaxPolicy {
  private defaultTaxRate: number;
  private countryTaxMap: Record<string, number>;
  constructor(defaultTaxRate: number, countryTaxMap?: Record<string, number>) {
    this.defaultTaxRate = defaultTaxRate;
    this.countryTaxMap = countryTaxMap || {
      DE: 0.19,
      US: 0.07,
    };
  }
  apply(country: string, price: number): number {
    const rate = this.countryTaxMap[country] ?? this.defaultTaxRate;
    return price * (1 + rate);
  }
}
// SRP: репозиторий заказов
class InMemoryOrderRepository implements OrderRepository {
  private storage: ProcessedOrder[] = [];
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  save(order: ProcessedOrder): void {
    this.storage.push(order);
    this.logger.log(`Saved order ${order.id} to in-memory storage`);
  }
  getAll(): ProcessedOrder[] {
    return [...this.storage];
  }
}
// SRP: уведомления (здесь просто лог)
class EmailNotifier implements Notifier {
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  sendOrderConfirmation(order: ProcessedOrder): void {
    const body = `
    Hello!
    Your order ${order.id} has been processed.
      Total: ${order.total.toFixed(2)} €
    Thank you!
    `;
    // В реальном мире здесь был бы SMTP, а не console.log
    this.logger.log(
      `Sending email to ${order.customerEmail}:\n${body.trim()}`
    );
  }
}
// SRP: отчёты
class ConsoleReportGenerator implements ReportGenerator {
  private logger: Logger;
  constructor(logger: Logger) {
    this.logger = logger;
  }
  printDailyReport(orders: ProcessedOrder[]): void {
    this.logger.log("=== DAILY REPORT ===");
    this.logger.log(`Total orders: ${orders.length}`);
    let totalRevenue = 0;
    let books = 0;
    let courses = 0;
    let subscriptions = 0;
    for (const order of orders) {
      totalRevenue += order.total;
      for (const item of order.items) {
        if (item.type === "book") books += item.quantity;
        if (item.type === "course") courses += item.quantity;
        if (item.type === "subscription") subscriptions += item.quantity;
      }
    }
    this.logger.log(`Total revenue: ${totalRevenue.toFixed(2)} €`);
    this.logger.log(`Books sold: ${books}`);
    this.logger.log(`Courses sold: ${courses}`);
    this.logger.log(`Subscriptions sold: ${subscriptions}`);
  }
}
// ---------- DIP + SRP: сервис оформления заказа ----------
class CheckoutService {
  // DIP: зависим от интерфейсов, а не от конкретных классов
  private discountPolicy: DiscountPolicy;
  private taxPolicy: TaxPolicy;
  private orderRepository: OrderRepository;
  private notifier: Notifier;
  private logger: Logger;
  constructor(
    discountPolicy: DiscountPolicy,
    taxPolicy: TaxPolicy,
    orderRepository: OrderRepository,
    notifier: Notifier,
    logger: Logger
  ) {
    this.discountPolicy = discountPolicy;
    this.taxPolicy = taxPolicy;
    this.orderRepository = orderRepository;
    this.notifier = notifier;
    this.logger = logger;
  }
  process(order: Order): ProcessedOrder {
    this.logger.log(`Start processing order ${order.id}`);
    let total = 0;
    const processedItems: ProcessedItem[] = [];
    for (const item of order.items) {
      const priceAfterDiscount = this.discountPolicy.apply(order, item);
      const priceWithTax = this.taxPolicy.apply(order.country, priceAfterDiscount);
      const lineTotal = priceWithTax * item.quantity;
      total += lineTotal;
      processedItems.push({
        ...item,
        priceAfterDiscount,
        priceWithTax,
        lineTotal,
      });
    }
    const processedOrder: ProcessedOrder = {
      ...order,
      items: processedItems,
      total,
      processedAt: new Date().toISOString(),
    };
    this.orderRepository.save(processedOrder);
    this.notifier.sendOrderConfirmation(processedOrder);
    this.logger.log(
      `Order ${order.id} processed successfully. Total = ${total.toFixed(2)}`
    );
    return processedOrder;
  }
}
// ---------- LSP: альтернативные реализации ----------
// Логгер, который «молчит», но по контракту всё ок
class SilentLogger implements Logger {
  log(_message: string): void {
    // ничего не делаем, но поведение предсказуемо и не ломает систему
  }
}
// Нотификатор, который сохраняет письма в массив (например, для тестов)
class TestNotifier implements Notifier {
  private sent: ProcessedOrder[] = [];
  sendOrderConfirmation(order: ProcessedOrder): void {
    this.sent.push(order);
  }
  getSent(): ProcessedOrder[] {
    return [...this.sent];
  }
}
// ---------- Демонстрация работы ----------
function goodDemo() {
  // Можно легко подменять реализации (DIP + LSP)
  const logger: Logger = new ConsoleLogger("[APP]");
  const repo = new InMemoryOrderRepository(logger);
  const discountPolicy: DiscountPolicy = new CompositeDiscountPolicy([
    new PremiumCustomerDiscount(0.1),
    new BookCategoryDiscount(0.05),
  ]);
  const taxPolicy: TaxPolicy = new CountryTaxPolicy(0.2, {
    DE: 0.19,
    US: 0.07,
  });
  const notifier: Notifier = new EmailNotifier(logger);
  const reportGenerator: ReportGenerator = new ConsoleReportGenerator(logger);
  const checkout = new CheckoutService(
    discountPolicy,
    taxPolicy,
    repo,
    notifier,
    logger
  );
  const order1: Order = {
    id: "ORD-1",
    customerEmail: "user@example.com",
    country: "DE",
    isPremiumCustomer: true,
    items: [
      { type: "book", name: "Clean Code", basePrice: 30, quantity: 1 },
      { type: "course", name: "Design Patterns", basePrice: 100, quantity: 1 },
    ],
  };
  const order2: Order = {
    id: "ORD-2",
    customerEmail: "another@example.com",
    country: "US",
    isPremiumCustomer: false,
    items: [
      {
        type: "subscription",
        name: "Monthly Pro Plan",
        basePrice: 20,
        quantity: 3,
      },
    ],
  };
  checkout.process(order1);
  checkout.process(order2);
  const all = repo.getAll();
  reportGenerator.printDailyReport(all);
}
goodDemo();
