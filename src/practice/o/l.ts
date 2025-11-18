// Задача 3 — Vehicle / Speed
// --------------------------
// В базовом классе метод getMaxSpeed() гарантирует неотрицательное число.
// В RocketCar возвращается отрицательное, что нарушает ожидания.
// TODO: Обеспечить, чтобы никакая реализация Vehicle не нарушала контракт.

abstract class Vehicle {
  abstract getMaxSpeed(): number; // ожидается >= 0
}

class Car extends Vehicle {
  getMaxSpeed() {
    return 180;
  }
}

class RocketCar extends Vehicle {
  getMaxSpeed() {
    return -999; // ??? странное поведение
  }
}

function printVehicleSpeed(v: Vehicle) {
  const speed = v.getMaxSpeed();
  // Здесь ожидаем, что speed >= 0
  console.log("Max speed:", speed);
}

// TODO: Исправить дизайн / реализации, чтобы LSP соблюдался.


// Задача 4 — PaymentProcessor / Refund
// ------------------------------------
// Базовый интерфейс предполагает, что любой PaymentProcessor умеет и pay, и refund.
// FreePaymentProcessor не умеет refund и кидает ошибку.
// TODO: Изменить дизайн, чтобы FreePaymentProcessor не нарушал LSP,
// но при этом контракт типов оставался честным.

interface PaymentProcessor {
  pay(amount: number): void;
  refund(amount: number): void;
}

class CardPaymentProcessor implements PaymentProcessor {
  pay(amount: number) {
    console.log("Pay by card:", amount);
  }
  refund(amount: number) {
    console.log("Refund to card:", amount);
  }
}

class FreePaymentProcessor implements PaymentProcessor {
  pay(amount: number) {
    console.log("Free payment:", amount);
  }
  refund(amount: number) {
    throw new Error("Free payments cannot be refunded");
  }
}

function processRefund(p: PaymentProcessor, amount: number) {
  // ожидаем, что любой PaymentProcessor умеет безопасно refund
  p.refund(amount);
}

// TODO: Переразбить интерфейсы / иерархию, чтобы не нарушать LSP.


// Задача 5 — StorageService / Null result
// ---------------------------------------
// Контракт get() обещает вернуть строку.
// В RemoteStorage возвращается null, если нет данных.
// TODO: Сделать так, чтобы базовый контракт был честным
// и подтипы не ослабляли тип/поведение (LSP).

interface StorageService {
  get(key: string): string; // ожидается строка
}

class LocalStorageService implements StorageService {
  private store: Record<string, string> = {};
  get(key: string): string {
    return this.store[key] ?? "";
  }
}

class RemoteStorageService implements StorageService {
  get(key: string): any {
    // имитация: приходит null из сети
    const value = Math.random() > 0.5 ? "value" : null;
    return value;
  }
}

function readConfig(storage: StorageService) {
  const value = storage.get("config");
  // Ожидаем, что value — строка
  console.log(value.toUpperCase());
}

// TODO: Исправить типы/дизайн так, чтобы LSP выполнялся.


// Задача 6 — NotificationSender / ограничения
// -------------------------------------------
// EmailSender может послать любое сообщение.
// SmsSender вдруг режет сообщение до 10 символов (меняет ожидания клиента).
// TODO: Сделать API таким, чтобы разные реализации не ломали ожидания
// вызывающего кода, который думает "я отправляю полный текст".

interface NotificationSender {
  send(recipient: string, message: string): void;
}

class EmailSender implements NotificationSender {
  send(recipient: string, message: string) {
    console.log(`Email to ${recipient}: ${message}`);
  }
}

class SmsSender implements NotificationSender {
  send(recipient: string, message: string) {
    const shortened = message.slice(0, 10); // неожиданное поведение
    console.log(`SMS to ${recipient}: ${shortened}`);
  }
}

function notify(sender: NotificationSender, user: string, text: string) {
  sender.send(user, text);
}

// TODO: Придумать дизайн, где ограничения по длине не нарушают LSP.


// Задача 7 — UserRepository / кеш
// -------------------------------
// Базовый интерфейс обещает, что getUser(id) возвращает актуальные данные.
// CachedUserRepository может вернуть устаревшие данные (кеш).
// TODO: Явно отразить в контракте, что может быть кеш,
// или разделить интерфейсы так, чтобы LSP не нарушался.

type User = { id: number; name: string };

interface UserRepository {
  getUser(id: number): Promise<User>;
}

class DbUserRepository implements UserRepository {
  async getUser(id: number): Promise<User> {
    return { id, name: "From DB" };
  }
}

class CachedUserRepository implements UserRepository {
  private cache: Record<number, User> = {
    1: { id: 1, name: "Old cached user" }
  };

  async getUser(id: number): Promise<User> {
    if (this.cache[id]) {
      return this.cache[id]; // может быть сильно устаревшим
    }
    return { id, name: "Fetched and cached" };
  }
}

async function printUser(repo: UserRepository, id: number) {
  const user = await repo.getUser(id);
  console.log("User name:", user.name);
}

// TODO: Перепроектировать контракты, чтобы ожидания по "актуальности"
// не нарушались подтипами.


// Задача 8 — DiscountCalculator / постусловия
// -------------------------------------------
// Базовый calcDiscountedPrice не должен увеличивать цену.
// SpecialDiscountCalculator иногда возвращает цену выше исходной.
// TODO: Обеспечить, чтобы никакая реализация не нарушала постусловие:
//   result <= originalPrice.

interface DiscountCalculator {
  calcDiscountedPrice(originalPrice: number): number;
}

class DefaultDiscountCalculator implements DiscountCalculator {
  calcDiscountedPrice(originalPrice: number): number {
    return originalPrice * 0.9;
  }
}

class SpecialDiscountCalculator implements DiscountCalculator {
  calcDiscountedPrice(originalPrice: number): number {
    // "особая логика": иногда поднимаем цену?!
    if (originalPrice < 50) return originalPrice + 10;
    return originalPrice;
  }
}

function applyDiscount(c: DiscountCalculator, price: number) {
  const newPrice = c.calcDiscountedPrice(price);
  console.log({ price, newPrice });
}

// TODO: Исправить реализации/контракт, чтобы LSP не нарушался.


// Задача 9 — DocumentPrinter / игнор параметров
// ---------------------------------------------
// Базовый интерфейс принтера поддерживает флаг duplex (двусторонняя печать).
// SimplePrinter просто игнорирует этот флаг.
// TODO: Обеспечить, чтобы реализации честно соблюдали контракт метода
// или изменить абстракцию так, чтобы LSP не страдал.

interface DocumentPrinter {
  print(text: string, duplex: boolean): void;
}

class AdvancedPrinter implements DocumentPrinter {
  print(text: string, duplex: boolean) {
    console.log(`Printing "${text}" in mode: ${duplex ? "duplex" : "simple"}`);
  }
}

class SimplePrinter implements DocumentPrinter {
  print(text: string, duplex: boolean) {
    // duplex игнорируется
    console.log(`Printing "${text}" only single-side`);
  }
}

function clientPrint(printer: DocumentPrinter) {
  printer.print("Hello", true); // ожидаем двусторонний режим
}

// TODO: переделать дизайн так, чтобы поведение не ломало ожидания клиента.


// Задача 10 — BankAccount / ограничения на снятие
// -----------------------------------------------
// Базовый класс позволяет снимать деньги до нуля.
// LimitedAccount вместо этого кидает ошибку при попытке снять "слишком много".
// TODO: Формально описать контракт withdraw (что именно допускается)
// и сделать иерархию так, чтобы LimitedAccount не нарушал LSP:
//   - или изменить базовый контракт,
//   - или использовать композицию вместо наследования.

class BankAccount {
  constructor(protected balance: number) {}

  withdraw(amount: number) {
    if (amount > this.balance) {
      throw new Error("Not enough money");
    }
    this.balance -= amount;
  }

  getBalance() {
    return this.balance;
  }
}

class LimitedAccount extends BankAccount {
  withdraw(amount: number) {
    if (amount > 100) {
      throw new Error("Limit exceeded");
    }
    super.withdraw(amount);
  }
}

function processPayment(acc: BankAccount, amount: number) {
  // ожидаем: можно снять любую сумму, не превышающую баланс
  acc.withdraw(am
