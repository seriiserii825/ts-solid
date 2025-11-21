// =====================================
// Задача 2 — Корзина и наборы товаров
// -------------------------------------
// Цель: один и тот же интерфейс для простого товара и набора.

interface ICartItem {
  getName(): string;
  getTotalPrice(): number;
}

interface IBundleItem extends ICartItem {
  add(item: ICartItem): void;
  remove(item: ICartItem): void;
}

// TODO-2.1: Реализуй класс ProductItem (лист)
// - поля: name: string, unitPrice: number, quantity: number
// - getName() → name
// - getTotalPrice() → unitPrice * quantity
class ProductItem implements ICartItem {
  constructor(
    private name: string,
    private unitPrice: number,
    private quantity: number,
  ) {}
  getName(): string {
    return this.name;
  }
  getTotalPrice(): number {
    return this.unitPrice * this.quantity;
  }
}

// TODO-2.2: Реализуй класс BundleItem (composite)
// - поля: name: string, items: CartItem[]
// - add(item: CartItem)
// - remove(item: CartItem)
// - getName() → name
// - getTotalPrice() → сумма getTotalPrice() всех items
class BundleItem implements IBundleItem {
  private items: ICartItem[] = []
  constructor( private name: string) {}
  add(item: ICartItem) {
    this.items.push(item);
  }
  remove(item: ICartItem) {
    this.items = this.items.filter(elem => elem !== item);
  }
  getName(): string {
    return this.name;
  }
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
  }
}

function demoCart() {
  const product_1 = new ProductItem("Mouse", 20, 1);
  const product_2 = new ProductItem("Keyboard", 50, 1);
  const office_1 = new ProductItem("Notebook", 5, 3);
  const office_2 = new ProductItem("Pen", 2, 5);
  const office_bundle = new BundleItem("Office pack");
  office_bundle.add(office_1)
  office_bundle.add(office_2)
  const items: ICartItem[] = [product_1, product_2, office_bundle];
  items.forEach(item => {
    console.log(`${item.getName()}: ${item.getTotalPrice()}`);
  });

  const total = items.reduce((acc, curr) => acc + curr.getTotalPrice(), 0);
  console.log("total", total);
  // TODO-2.3: собери корзину:
  // - продукт: "Mouse", 20€, qty 1
  // - продукт: "Keyboard", 50€, qty 1
  // - набор "Office pack":
  //     - "Notebook", 5€, qty 3
  //     - "Pen", 2€, qty 5
  //
  // Посчитай общую сумму:
  // const items: CartItem[] = [...]
  // const total = items.reduce(...)
  // Выведи имена и цены каждого элемента (включая bundle)
}
demoCart();
