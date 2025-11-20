// ===============================
// 3) Платёжные операции
// -------------------------------
// Абстракция: Payment (withdraw, deposit)
// Реализация: StripeProvider, PayPalProvider, LocalBankProvider
// ЗАДАЧА: Позволить создавать разные Payment-типы, но с разными провайдерами.

interface Provider {
  pay(amount: number): void;
}

class StripeProvider implements Provider {
  pay(amount: number) {
    console.log(`Paying ${amount} using Stripe`);
  }
}
class PayPalProvider implements Provider {
  pay(amount: number) {
    console.log(`Paying ${amount} using PayPal`);
  }
}
class LocalBankProvider implements Provider {
  pay(amount: number) {
    console.log(`Paying ${amount} using Local Bank`);
  }
}

abstract class Payment {
  constructor(protected provider: Provider) {}
  abstract process(amount: number): void;
}

class WithdrawPayment extends Payment {
  process(amount: number) {
    this.provider.pay(amount);
    console.log(`Withdrew ${amount}`);
  }
}

class DepositPayment extends Payment {
  process(amount: number) {
    this.provider.pay(amount);
    console.log(`Deposited ${amount}`);
  }
}

const stripe = new StripeProvider();
const paypal = new PayPalProvider();
const localBank = new LocalBankProvider();
new WithdrawPayment(stripe).process(100);
new DepositPayment(paypal).process(200);
new WithdrawPayment(localBank).process(300);
