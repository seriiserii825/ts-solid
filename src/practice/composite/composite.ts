// =====================================
// Задача 4 — Меню сайта c правами доступа
// -------------------------------------
// Цель: Composite + небольшая бизнес-логика.

type UserRole = "guest" | "user" | "admin";

interface SecureMenuComponent {
  render(indent?: number): void;
  isVisibleFor(role: UserRole): boolean;
}

// TODO-4.1: SecureMenuItem (leaf)
// - label: string
// - url: string
// - allowedRoles: UserRole[]   (например ["user", "admin"])
// - isVisibleFor(role) → true, если role есть в allowedRoles
// - render(indent) → выводит пункт меню, но только если видим для роли (передавать роль как параметр не нужно — сделаем позже)
class SecureMenuItem {
  // ...
}

// TODO-4.2: SecureMenuGroup (composite)
// - label: string
// - children: SecureMenuComponent[]
// - add(child)
// - remove(child)
// - isVisibleFor(role) → true, если хотя бы один ребёнок видим для роли
// - render(indent) → выводит группу и детей, но в реальном приложении
//   было бы удобно принимать роль пользователи, например:
//   renderForRole(role: UserRole, indent?: number)
//   Для простоты можешь оставить render(role, indent?) или сделать отдельный метод.
class SecureMenuGroup {
  // ...
}

function demoSecureMenu() {
  // TODO-4.3:
  // Создай меню:
  //   - "Home" → ["guest", "user", "admin"]
  //   - "Profile" → ["user", "admin"]
  //   - "Admin" (группа)
  //       - "Users" → ["admin"]
  //       - "Settings" → ["admin"]
  //
  // Напиши функцию:
  // renderMenuForRole(root: SecureMenuComponent, role: UserRole)
  // которая выводит только те элементы, у которых isVisibleFor(role) === true.
  //
  // В demo:
  //   - вызови для "guest"
  //   - вызови для "admin"
}
// demoSecureMenu();

// =====================================
// Задача 5 — Организационная структура (Org chart)
// -------------------------------------
// Цель: ещё одна вариация: сотрудник и отдел.

interface OrgUnit {
  getName(): string;
  getTotalSalary(): number;
  print(indent?: number): void;
}

// TODO-5.1: Employee (leaf)
// - name: string
// - salary: number
// - getTotalSalary() → salary
class Employee {
  // ...
}

// TODO-5.2: Department (composite)
// - name: string
// - children: OrgUnit[]
// - add(unit: OrgUnit)
// - remove(unit: OrgUnit)
// - getTotalSalary() → сумма зарплат всех детей (включая вложенные отделы)
class Department {
  // ...
}

function demoOrg() {
  // TODO-5.3: Построй структуру компании:
  // Company
  //   - Dev Department
  //       - Employee "Alice", 3000
  //       - Employee "Bob", 2500
  //   - Sales Department
  //       - Employee "Carol", 2000
  //
  // Выведи:
  // - зарплату Dev отдела
  // - зарплату всей Company
}
// demoOrg();
