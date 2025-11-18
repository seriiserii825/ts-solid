// =============================
// Задача 1 — PromoService (промокоды в интернет-магазине)
// -----------------------------
// Сейчас PromoService нарушает OCP: при добавлении нового промокода
// приходится менять метод applyPromo и дописывать новые if.
// ЗАДАЧА: спроектировать такую архитектуру, чтобы можно было
// добавлять новые типы промокодов (процент, фиксированная сумма,
// бесплатная доставка, подарок, промо на категорию)
// БЕЗ изменения PromoService.
// Можно вводить интерфейсы, отдельные классы, реестр стратегий и т.п.

type Product = {
  id: number;
  price: number;
  category?: string;
};

export class PromoService {
  applyPromo(code: string, product: Product): number {
    if (code === "SALE10") {
      return product.price * 0.9; // скидка 10%
    }

    if (code === "SALE20") {
      return product.price * 0.8; // скидка 20%
    }

    // если промо не найден
    return product.price;
  }
}

// пример использования (для ориентира)
const promoService = new PromoService();
promoService.applyPromo("SALE10", { id: 1, price: 100, category: "electronics" });

interface PromoStrategy {
  apply(product: Product): number;
}

class Sale10Strategy implements PromoStrategy {
  apply(product: Product): number {
    return product.price * 0.9; // скидка 10%
  }
}

class Sale20Strategy implements PromoStrategy {
  apply(product: Product): number {
    return product.price * 0.8; // скидка 20%
  }
}

const strategies = ['SALE10', 'SALE20'] as const;
type PromoCodes = typeof strategies[number];

class PromoServiceOCP {
  private strategies: { [code : string]: PromoStrategy } = {};
  private codes: PromoCodes[] = ["SALE10", "SALE20"];

  constructor() {
    this.strategies[this.codes[0]] = new Sale10Strategy();
    this.strategies[this.codes[1]] = new Sale20Strategy();
  }

  applyPromo(code: string, product: Product): number {
    const strategy = this.strategies[code];
    if (strategy) {
      return strategy.apply(product);
    }
    return product.price; // если промо не найден
  }
}
const promoServiceOCP = new PromoServiceOCP();
promoServiceOCP.applyPromo("SALE10", { id: 1, price: 100, category: "electronics" });
promoServiceOCP.applyPromo("SALE20", { id: 2, price: 200, category: "clothing" });
