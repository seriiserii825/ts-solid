export default function productBuilder() {
  const products: Product[] = [
    { id: 1, title: "Laptop", category: "electronics", price: 999, inStock: true },
    { id: 2, title: "Phone", category: "electronics", price: 699, inStock: false },
    { id: 3, title: "Shirt", category: "clothing", price: 49, inStock: true },
    { id: 4, title: "Shoes", category: "clothing", price: 89, inStock: true },
    { id: 5, title: "Headphones", category: "electronics", price: 199, inStock: true },
  ];

  interface IProductBuilder {
    whereCategory(category: string): this;
    minPrice(value: number): this;
    maxPrice(value: number): this;
    onlyInStock(): this;
    build(): (products: Product[]) => Product[];
    execute(products: Product[]): Product[];
  }
  type Product = {
    id: number;
    title: string;
    category: string;
    price: number;
    inStock: boolean;
  };
  class ProductQueryBuilder implements IProductBuilder {
    private category: string | null = null;
    private minPriceValue: number | null = null;
    private maxPriceValue: number | null = null;
    private inStockOnly: boolean = false;

    whereCategory(category: string): this {
      this.category = category;
      return this;
    }
    minPrice(value: number): this {
      this.minPriceValue = value;
      return this;
    }
    maxPrice(value: number): this {
      this.maxPriceValue = value;
      return this;
    }
    onlyInStock(): this {
      this.inStockOnly = true;
      return this;
    }

    build(): (products: Product[]) => Product[] {
      return (products: Product[]) => {
        let result = products;

        if (this.category) {
          result = result.filter((p) => p.category === this.category);
        }
        if (this.minPriceValue !== null) {
          result = result.filter((p) => p.price >= this.minPriceValue!);
        }
        if (this.maxPriceValue !== null) {
          result = result.filter((p) => p.price <= this.maxPriceValue!);
        }
        if (this.inStockOnly) {
          result = result.filter((p) => p.inStock);
        }

        return result;
      };
    }
    execute(products: Product[]): Product[] {
      const filter = this.build();
      return filter(products);
    }
  }

  const builder = new ProductQueryBuilder();
  const filter = builder
    .whereCategory("electronics")
    .minPrice(100)
    .maxPrice(200)
    .onlyInStock()
    .build();
  const result = filter(products);
  console.log("result", result);

  const result2 = new ProductQueryBuilder()
    .whereCategory("clothing")
    .onlyInStock()
    .execute(products);
  console.log("result2", result2);
}
