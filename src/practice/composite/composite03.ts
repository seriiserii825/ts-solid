// ==============================
// Практика по Composite
// ==============================

// Совет: можешь создать файл composite-practice.ts
// и решить задачи по очереди, закомментировав остальные.

// =====================================
// Задача 1 — Файловая система (File / Directory)
// -------------------------------------
// Цель: попрактиковаться в простом дереве: лист + папка.

interface IFileSystemItem {
  getName(): string;
  getSize(): number;
  print(indent?: number): void;
}

// TODO-1.1: Реализуй класс File (лист)
// - хранит name: string и size: number (в байтах)
// - getName() → name
// - getSize() → size
// - print(indent) → выводит: "<пробелы>- <name> (<size>b)"
class FileItem implements IFileSystemItem {
  private name: string;
  private size: number;

  constructor(name: string, size: number) {
    this.name = name;
    this.size = size;
  }

  getName(): string {
    return this.name;
  }

  getSize(): number {
    return this.size;
  }

  print(indent: number = 0): void {
    const spaces = " ".repeat(indent);
    console.log(`${spaces}- ${this.name} (${this.size}b)`);
  }
}

// TODO-1.2: Реализуй класс Directory (composite)
// - хранит name: string и children: FileSystemItem[]
// - add(item: FileSystemItem)
// - remove(item: FileSystemItem)
// - getName() → name
// - getSize() → сумма getSize() всех children
// - print(indent) → выводит:
//    "<пробелы>[DIR] <name>"
//    затем вызывает print(indent + 2) у всех детей
class Directory implements IFileSystemItem {
  private name: string;
  private children: IFileSystemItem[];

  constructor(name: string, children: IFileSystemItem[]) {
    this.name = name;
    this.children = children;
  }

  add(item: IFileSystemItem) {
    this.children.push(item);
  }

  remove(item: IFileSystemItem) {
    this.children = this.children.filter((elem: IFileSystemItem) => elem !== item);
  }

  getName() {
    return this.name;
  }
  getSize(): number {
    if (this.children.length === 0) {
      return 0;
    }
    return this.children.reduce((acc, item) => acc + item.getSize(), 0);
  }
  print(indent: number = 0): void {
    const spaces = " ".repeat(indent);
    console.log(`${spaces}[DIR] ${this.name}`);
    this.children.forEach((item) => item.print(indent + 2));
  }
}

function demoFileSystem() {
  const index = new FileItem("index.html", 40);
  const main_css = new FileItem("main.css", 20);
  const reset_css = new FileItem("reset.css", 30);
  const styles_dir = new Directory("styles", [main_css, reset_css]);
  const app_js = new FileItem("app.js", 55);
  const scripts_dir = new Directory("scripts", [app_js]);
  const root = new Directory("root", [index, styles_dir, scripts_dir])
  root.print()
  const root_size = root.getSize()
  console.log("root_size", root_size);
  // TODO-1.3: собери структуру:
  // root
  //   - index.html (100)
  //   - styles
  //       - main.css (50)
  //       - reset.css (20)
  //   - scripts
  //       - app.js (200)
  // В конце:
  // - вызови root.print()
  // - выведи в консоль общий размер root.getSize()
}
demoFileSystem();
