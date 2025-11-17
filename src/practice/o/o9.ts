// 9) Ценообразование
// Есть класс PriceCalculator, который считает цену по одной формуле.
//
// Требование: добавь разные стратегии ценообразования (premium, economy, seasonal),
// и сделай так, чтобы калькулятор мог использовать новые стратегии без изменений.

interface PricingStrategy {
  calculatePrice(basePrice: number): number;
}

class PremiumPricingStrategy implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 1.5; // 50% markup for premium
  }
}

class EconomyPricingStrategy implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.8; // 20% discount for economy
  }
}

class SeasonalPricingStrategy implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    const seasonalDiscount = 0.9; // 10% seasonal discount
    return basePrice * seasonalDiscount;
  }
}
