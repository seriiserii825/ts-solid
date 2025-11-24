// 1) Создай базовый класс Calculator с методом calc(n)
//    Сделай декоратор DoubleDecorator → умножает результат calc на 2.
//    Сделай декоратор SquareDecorator → возводит результат calc в квадрат.
interface ICalculator {
    calc(n: number): number;
}

class Calculator implements ICalculator {
    calc(n: number): number {
        return n;
    }
}

class DoubleDecorator implements ICalculator {
    private calculator: ICalculator;

    constructor(calculator: ICalculator) {
        this.calculator = calculator;
    }

    calc(n: number): number {
        return this.calculator.calc(n) * 2;
    }
}

class SquareDecorator implements ICalculator {
    private calculator: ICalculator;

    constructor(calculator: ICalculator) {
        this.calculator = calculator;
    }

    calc(n: number): number {
        const result = this.calculator.calc(n);
        return result * result;
    }
}

const baseCalculator = new Calculator();
const doubleCalculator = new DoubleDecorator(baseCalculator);
const squareCalculator = new SquareDecorator(doubleCalculator);

console.log(baseCalculator.calc(3));   // 3
console.log(doubleCalculator.calc(3)); // 3 * 2 = 6
console.log(squareCalculator.calc(3)); // ((3 * 2) ^ 2) = 36
