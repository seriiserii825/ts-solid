// 1) Фильтр товаров по разным условиям
// Есть класс ProductFilter, который фильтрует массив товаров по цвету.
//
// Требование: нужно сделать так, чтобы класс можно было расширять новыми правилами, не изменяя его.
// Добавь возможность фильтрации по размеру, цене и нескольким условиям одновременно — но не редактируя старый код.
//

interface Product {
  name: string;
  color: string;
  size: string;
  price: number;
}
class ProductFilter {
  filterByColor(products: Product[], color: string): Product[] {
    return products.filter(p => p.color === color);
  }
}
// Расширение функционала без изменения существующего кода
interface Specification<T> {
  isSatisfied(item: T): boolean;
}
class ColorSpecification implements Specification<Product> {
  constructor(private color: string) {}
  isSatisfied(item: Product): boolean {
    return item.color === this.color;
  }
}
class SizeSpecification implements Specification<Product> {
  constructor(private size: string) {}
  isSatisfied(item: Product): boolean {
    return item.size === this.size;
  }
}
class PriceSpecification implements Specification<Product> {
  constructor(private price: number) {}
  isSatisfied(item: Product): boolean {
    return item.price <= this.price;
  }
}
const products: Product[] = [
  { name: 'Product 1', color: 'red', size: 'M', price: 100 },
  { name: 'Product 2', color: 'blue', size: 'L', price: 150 },
  { name: 'Product 3', color: 'green', size: 'S', price: 200 },
];
const productFilter = new ProductFilter();
const redProducts = productFilter.filterByColor(products, 'red');
const sizeSpec = new SizeSpecification('L');
const largeProducts = products.filter(p => sizeSpec.isSatisfied(p));
const priceSpec = new PriceSpecification(150);
const affordableProducts = products.filter(p => priceSpec.isSatisfied(p));
