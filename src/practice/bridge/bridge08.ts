// ===============================
// 8) Система скидок
// -------------------------------
// Абстракция: Discount (apply())
// Реализация: PercentageCalculator, FixedCalculator
// ЗАДАЧА: Один тип скидки может считать по разным формулам.
// (Например, Скидка “Черная пятница” может быть процентной или фиксированной)

interface Calculator {
    calculate(amount: number): number;
}

class PercentageCalculator implements Calculator {
    private percentage: number;

    constructor(percentage: number) {
        this.percentage = percentage;
    }

    calculate(amount: number): number {
        return amount - (amount * this.percentage) / 100;
    }
}

class FixedCalculator implements Calculator {
    private discountAmount: number;

    constructor(discountAmount: number) {
        this.discountAmount = discountAmount;
    }

    calculate(amount: number): number {
        return amount - this.discountAmount;
    }
}

abstract class Discount {
    protected calculator: Calculator;

    constructor(calculator: Calculator) {
        this.calculator = calculator;
    }

    abstract apply(amount: number): number;
}

class BlackFridayDiscount extends Discount {
    apply(amount: number): number {
        return this.calculator.calculate(amount);
    }
}

// Пример использования:
const percentageCalculator = new PercentageCalculator(20); // 20% скидка
const fixedCalculator = new FixedCalculator(50); // Фиксированная скидка 50
const blackFridayPercentageDiscount = new BlackFridayDiscount(percentageCalculator);
const blackFridayFixedDiscount = new BlackFridayDiscount(fixedCalculator);
const originalAmount = 200;
console.log("Черная пятница (процентная скидка):", blackFridayPercentageDiscount.apply(originalAmount)); // 160
console.log("Черная пятница (фиксированная скидка):", blackFridayFixedDiscount.apply(originalAmount)); // 150
