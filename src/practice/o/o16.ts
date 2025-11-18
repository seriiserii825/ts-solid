// =============================
// Задача 6 — ShippingCostCalculator (расчёт доставки)
// -----------------------------
// Сейчас калькулятор поддерживает только два типа доставки через if.
// ЗАДАЧА: сделать систему, которая позволяет:
//   - добавлять новые методы доставки (pickup, same-day, express и т.п.)
//   - подключать сторонние курьерские сервисы (DHL, UPS, NovaPoshta)
// и при этом НЕ менять метод calculate при добавлении нового способа.
interface ShippingMethod {
  calculateCost(weight: number): number;
}

class LocalShipping implements ShippingMethod {
  calculateCost(weight: number): number {
    return 5;
  }
}

class InternationalShipping implements ShippingMethod {
  calculateCost(weight: number): number {
    return weight * 4;
  }
}

class PickUpShipping implements ShippingMethod {
  calculateCost(weight: number): number {
    return 0;
  }
}

class ShippingCostCalculator {
  private methods: { [key: string]: ShippingMethod } = {};

  registerMethod(name: string, method: ShippingMethod) {
    this.methods[name] = method;
  }

  calculate(methodName: string, weight: number): number {
    const method = this.methods[methodName];
    if (!method) {
      throw new Error(`Shipping method ${methodName} not found`);
    }
    return method.calculateCost(weight);
  }
}

const shippingCalc = new ShippingCostCalculator();
shippingCalc.registerMethod("local", new LocalShipping());
shippingCalc.registerMethod("international", new InternationalShipping());
shippingCalc.registerMethod("pickup", new PickUpShipping());
shippingCalc.calculate("local", 2);


// class ShippingCostCalculator {
//   calculate(method: "local" | "international", weight: number): number {
//     if (method === "local") return 5;
//     if (method === "international") return weight * 4;
//     return 0;
//   }
// }
//
// const shippingCalc = new ShippingCostCalculator();
// shippingCalc.calculate("local", 2);
//
//
