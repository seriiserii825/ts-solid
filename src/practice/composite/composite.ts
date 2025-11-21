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
