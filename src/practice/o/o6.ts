// 6) Оплата
// Есть класс PaymentProcessor, который поддерживает PayPal.
//
// Требование: добавить поддержку Stripe, Crypto, Apple Pay —
// но без изменения старого класса.

interface PaymentMethod {
  pay(amount: number): void;
}

class PayPal implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using PayPal.`);
  }
}

class Stripe implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Stripe.`);
  }
}

class Crypto implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Paid ${amount} using Cryptocurrency.`);
  }
}
