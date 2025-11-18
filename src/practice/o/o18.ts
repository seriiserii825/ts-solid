// =============================
// Задача 8 — validateCart (правила валидации корзины)
// -----------------------------
// Сейчас все правила валидации закодированы внутри функции.
// ЗАДАЧА: спроектировать систему "правил валидации",
// где можно подключать/отключать/добавлять новые правила:
//   - минимальная сумма заказа
//   - несовместимые товары
//   - ограничения по странам
//   - условие "только для зарегистрированных"
// при этом НЕ менять тело функции validateCart.

type SCart = { total: number; items: string[] };

function svalidateCart(cart: Cart): string[] {
  const errors: string[] = [];

  if (cart.total < 10) {
    errors.push("Минимальная сумма заказа 10€");
  }

  if (cart.items.includes("alcohol") && cart.items.includes("medicine")) {
    errors.push("Нельзя покупать вместе алкоголь и лекарства");
  }

  return errors;
}

validateCart({ total: 5, items: ["alcohol", "medicine"] });


// =============================
// Задача 8 — validateCart (правила валидации корзины)
// =============================

type Cart = {
  total: number;
  items: string[];
  country?: string;
  isRegistered?: boolean;
};

// Интерфейс для правила валидации
interface CartRule {
  validate(cart: Cart): string[]; // пустой массив = ошибок нет
}

// ===== Правила =====

// 1) Минимальная сумма заказа
class MinTotalRule implements CartRule {
  constructor(private minTotal: number) {}

  validate(cart: Cart): string[] {
    if (cart.total < this.minTotal) {
      return [`Минимальная сумма заказа ${this.minTotal}€`];
    }
    return [];
  }
}

// 2) Несовместимые товары (набор пар)
class IncompatibleItemsRule implements CartRule {
  constructor(private pairs: [string, string][]) {}

  validate(cart: Cart): string[] {
    const errors: string[] = [];

    for (const [a, b] of this.pairs) {
      if (cart.items.includes(a) && cart.items.includes(b)) {
        errors.push(`Нельзя покупать вместе ${a} и ${b}`);
      }
    }

    return errors;
  }
}

// 3) Ограничения по странам
class CountryRestrictionRule implements CartRule {
  constructor(private bannedCountries: string[]) {}

  validate(cart: Cart): string[] {
    if (!cart.country) return [];
    if (this.bannedCountries.includes(cart.country)) {
      return [`Доставка в страну ${cart.country} недоступна`];
    }
    return [];
  }
}

// 4) Только для зарегистрированных пользователей
class RegisteredOnlyRule implements CartRule {
  validate(cart: Cart): string[] {
    if (!cart.isRegistered) {
      return ["Оформление доступно только для зарегистрированных пользователей"];
    }
    return [];
  }
}

// ===== Конфигурация правил (можно менять без изменения validateCart) =====

const cartRules: CartRule[] = [
  new MinTotalRule(10),
  new IncompatibleItemsRule([["alcohol", "medicine"]]),
  new CountryRestrictionRule(["RU", "KP"]),
  new RegisteredOnlyRule()
];

// ===== Функция валидации (OCP-friendly) =====

function validateCart(cart: Cart): string[] {
  const errors: string[] = [];

  for (const rule of cartRules) {
    errors.push(...rule.validate(cart));
  }

  return errors;
}

// Пример использования
const errors = validateCart({
  total: 5,
  items: ["alcohol", "medicine"],
  country: "RU",
  isRegistered: false
});

console.log(errors);
/*
[
  'Минимальная сумма заказа 10€',
  'Нельзя покупать вместе alcohol и medicine',
  'Доставка в страну RU недоступна',
  'Оформление доступно только для зарегистрированных пользователей'
]
*/
