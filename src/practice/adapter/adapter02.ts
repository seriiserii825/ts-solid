// =========================
// Задача 2 — Платёжные системы
// -------------------------
// Новый код ожидает:
interface NewPaymentSystem {
  pay(amount: number, currency: string): void;
}

class PaymentSystem implements NewPaymentSystem {
  pay(amount: number, currency: string) {
    console.log(`Paid: ${amount} ${currency}`);
  }
}

// Но у тебя есть старый класс:
class OldPaymentService {
  makePayment(sumInCents: number) {
    console.log("Paid:", sumInCents, "cents");
  }
}

// ❗ ЗАДАЧА:
// Сделать адаптер OldPaymentService → NewPaymentSystem,
// чтобы клиентский код всегда работал с интерфейсом NewPaymentSystem.

interface IOldPayment {
  makePayment(sumInCents: number): void;
}

class PaymentAdapter implements NewPaymentSystem {
  constructor(private payment: IOldPayment) {}

  pay(amount: number, currency: string) {
    if (currency !== "USD") {
      throw new Error("OldPaymentService supports only USD");
    }
    const sumInCents = amount * 100;
    this.payment.makePayment(sumInCents);
  }
}

const new_payment = new PaymentSystem();
new_payment.pay(100, "USD");

const old_payment = new OldPaymentService();
const adapted_payment = new PaymentAdapter(old_payment);
try {
  adapted_payment.pay(10, "USD");
} catch (e: unknown) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
