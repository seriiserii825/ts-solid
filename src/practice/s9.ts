// 🧩 Задача 9 — Класс, который знает и про UI, и про данные
// ts
// Копировать код
// class TodoManager {
//   private todos: string[] = [];
//
//   addTodo(text: string) {
//     this.todos.push(text);
//     localStorage.setItem("todos", JSON.stringify(this.todos));
//     const li = document.createElement("li");
//     li.textContent = text;
//     document.querySelector("#todo-list")?.appendChild(li);
//   }
// }
// Твоя задача:
// Предложи, как разделить:
//
// работу с данными/хранилищем,
//
// работу с DOM/UI,
// чтобы каждый класс имел одну ответственность. Просто опиши структуру.

class TodoStorage {
  save(name: string, data: string) {
    localStorage.setItem(name, data);
  }
}

class TodoHtml {
  insertLi(text: string) {
    const li = document.createElement("li");
    li.textContent = text;
    document.querySelector("#todo-list")?.appendChild(li);
  }
}

class TodoManager {
  private todos: string[] = []
  private storage: TodoStorage;
  private html: TodoHtml;

  constructor(storage: TodoStorage, html: TodoHtml) {
    this.storage = storage;
    this.html = html
  }

  addTodo(text: string) {
    this.todos.push(text)
    this.storage.save("todos", JSON.stringify(this.todos))
    this.html.insertLi(text)
  }
}
