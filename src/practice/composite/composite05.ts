// =====================================
// Задача 5 — ToDo-список с подзадачами
// -------------------------------------
// Цель: Composite + состояние (completed).

interface ITaskComponent {
  getTitle(): string;
  complete(): void;
  isCompleted(): boolean;
  print(indent?: number): void;
}

// TODO-5.1: SimpleTask (лист)
// - title: string
// - поле completed: boolean
// - complete() → ставит completed = true
// - isCompleted() → возвращает completed
// - print(indent) → "[x] title" или "[ ] title"
class SimpleTask implements ITaskComponent {
  private title: string;
  private completed: boolean = false;

  constructor(title: string) {
    this.title = title;
  }

  getTitle(): string {
    return this.title;
  }

  complete(): void {
    this.completed = true;
  }
  isCompleted(): boolean {
    return this.completed;
  }
  print(indent: number = 0): void {
    const spaces = " ".repeat(indent);
    const prefix = this.completed ? "[x]" : "[]";
    console.log(`${spaces} ${prefix} ${this.title}`);
  }
}

// TODO-5.2: TaskGroup (composite)
// - title: string
// - children: TaskComponent[]
// - add(task: TaskComponent)
// - remove(task: TaskComponent)
// - complete() → вызывает complete() для всех детей
// - isCompleted() → true, если все children.isCompleted() === true
// - print(indent) → выводит название группы и все подзадачи
class TaskGroup implements ITaskComponent {
  private title: string;
  private children: ITaskComponent[] = [];
  constructor(title: string) {
    this.title = title;
  }
  getTitle(): string {
    return this.title;
  }
  add(task: ITaskComponent): void {
    this.children.push(task);
  }
  remove(task: ITaskComponent) {
    this.children = this.children.filter((item: ITaskComponent) => task !== item);
  }
  complete(): void {
    for (const task of this.children) {
      task.complete();
    }
  }
  isCompleted(): boolean {
    return this.children.length > 0 && this.children.every((child) => child.isCompleted());
  }
  print(indent: number = 0) {
    const spaces = " ".repeat(indent);
    console.log(`${spaces} ${this.getTitle()}`);
    this.children.forEach((item) => item.print(indent + 2));
  }
}

function demoTasks() {
  const design = new SimpleTask("Design");
  const development = new TaskGroup("Development");
  const layout = new SimpleTask("Layout");
  const connect = new SimpleTask("Connect API");
  development.add(layout);
  development.add(connect);
  const project = new TaskGroup("Website");
  project.add(design);
  project.add(development);
  project.print();
  layout.complete()
  project.print()
  console.log(development.isCompleted(), "development is completed");
  console.log(project.isCompleted(), "project is completed");

  connect.complete()
  project.print()
  console.log(development.isCompleted(), "development is completed");
  console.log(project.isCompleted(), "project is completed");

  
  // TODO-5.3: создай такую структуру:
  // Project "Website":
  //   - Task: "Design"
  //   - Group "Development":
  //       - "Layout"
  //       - "Connect API"
  //
  // 1) Выведи структуру через print()
  // 2) Отметь complete() только "Layout"
  // 3) Проверь isCompleted() у группы "Development" и всего проекта
}
demoTasks();
