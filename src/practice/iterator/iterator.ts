// 🧩 ЗАДАЧА — Реализовать итератор для дерева категорий
// У тебя есть дерево категорий, как в WordPress/WooCommerce:
//
// ts
// Copy code
// const categories = {
//   name: "Electronics",
//   children: [
//     {
//       name: "Phones",
//       children: [
//         { name: "iPhone", children: [] },
//         { name: "Samsung", children: [] },
//       ],
//     },
//     {
//       name: "Laptops",
//       children: [
//         { name: "MacBook", children: [] },
//         { name: "Dell", children: [] },
//       ],
//     },
//   ],
// };
// ❗ Твоя задача:
// Создать итератор, который проходит по дереву в глубину (DFS)
// и возвращает имена категорий в правильном порядке, например:
//
// nginx
// Copy code
// Electronics
// Phones
// iPhone
// Samsung
// Laptops
// MacBook
// Dell
// 💡 Требования:
// Создать интерфейс Iterator<T>
//
// Создать класс CategoryIterator
//
// Итератор должен работать через стек (не рекурсией)
//
// Итератор должен быть независим от внутренней структуры дерева
//
// В решении нельзя использовать function* и yield (иначе слишком легко)

interface Category {
  name: string;
  children: Category[];
}
interface Iterator<T> {
  hasNext(): boolean;
  next(): T;
}
class CategoryIterator implements Iterator<string> {
  private stack: Category[];

  constructor(private root: Category) {
    this.stack = [root];
  }

  hasNext(): boolean {
    return this.stack.length > 0;
  }

  next(): string {
    if (!this.hasNext()) {
      throw new Error("No more categories");
    }

    const current = this.stack.pop()!;
    // Push children to stack in reverse order to maintain DFS order
    for (let i = current.children.length - 1; i >= 0; i--) {
      this.stack.push(current.children[i]);
    }
    return current.name;
  }
}

// Example usage:
const categories: Category = {
  name: "Electronics",
  children: [
    {
      name: "Phones",
      children: [
        { name: "iPhone", children: [] },
        { name: "Samsung", children: [] },
      ],
    },
    {
      name: "Laptops",
      children: [
        { name: "MacBook", children: [] },
        { name: "Dell", children: [] },
      ],
    },
  ],
};
const iterator = new CategoryIterator(categories);
while (iterator.hasNext()) {
  console.log(iterator.next());
}

