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
class Employee implements OrgUnit {
  private name: string;
  private salary: number;
  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }
  getName(): string {
    return this.name;
  }
  getTotalSalary(): number {
    return this.salary;
  }
  print(indent: number = 0): void {
    console.log(`${' '.repeat(indent)}- Employee: ${this.name}, Salary: ${this.salary}`);
  }
}

// TODO-5.2: Department (composite)
// - name: string
// - children: OrgUnit[]
// - add(unit: OrgUnit)
// - remove(unit: OrgUnit)
// - getTotalSalary() → сумма зарплат всех детей (включая вложенные отделы)
class Department implements OrgUnit {
  private name: string;
  private children: OrgUnit[] = [];
  constructor(name: string) {
    this.name = name;
  }
  add(unit: OrgUnit): void {
    this.children.push(unit);
  }
  remove(unit: OrgUnit): void {
    this.children = this.children.filter(child => child !== unit);
  }
  getName(): string {
    return this.name;
  }
  getTotalSalary(): number {
    return this.children.reduce((total, child) => total + child.getTotalSalary(), 0);
  }
  print(indent: number = 0): void {
    console.log(`${' '.repeat(indent)}- Department: ${this.name}`);
    this.children.forEach(child => child.print(indent + 2));
  }
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
  const company = new Department("Company");
  const devDept = new Department("Dev Department");
  const salesDept = new Department("Sales Department");
  const alice = new Employee("Alice", 3000);
  const bob = new Employee("Bob", 2500);
  const carol = new Employee("Carol", 2000);
  devDept.add(alice);
  devDept.add(bob);
  salesDept.add(carol);
  company.add(devDept);
  company.add(salesDept);
  company.print();
  console.log(`Dev Department Total Salary: ${devDept.getTotalSalary()}`);
  console.log(`Company Total Salary: ${company.getTotalSalary()}`);

}
demoOrg();
