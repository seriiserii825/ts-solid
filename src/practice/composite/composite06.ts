// =====================================
// Задача 6 — Меню сайта c правами доступа
// -------------------------------------
// Цель: Composite + небольшая бизнес-логика.

type TUserRole = "guest" | "user" | "admin";

interface ISecureMenuComponent {
  render(indent?: number): void;
  isVisibleFor(role: TUserRole): boolean;
  renderForRole(role: TUserRole, indent?: number): void;
}

// TODO-6.1: SecureMenuItem (leaf)
// - label: string
// - url: string
// - allowedRoles: UserRole[]   (например ["user", "admin"])
// - isVisibleFor(role) → true, если role есть в allowedRoles
// - render(indent) → выводит пункт меню, но только если видим для роли (передавать роль как параметр не нужно — сделаем позже)
class SecureMenuItem implements ISecureMenuComponent {
  private label: string;
  private url: string;
  private allowedRoles: TUserRole[];

  constructor(label: string, url: string, allowedRoles: TUserRole[]) {
    this.label = label;
    this.url = url;
    this.allowedRoles = allowedRoles;
  }

  isVisibleFor(role: TUserRole): boolean {
    return this.allowedRoles.includes(role);
  }

  render(indent: number = 0): void {
    console.log(`${" ".repeat(indent)}- ${this.label} (${this.url})`);
  }

  renderForRole(role: TUserRole, indent: number = 0): void {
    if (this.isVisibleFor(role)) {
      this.render(indent);
    }
  }
}

// TODO-6.2: SecureMenuGroup (composite)
// - label: string
// - children: SecureMenuComponent[]
// - add(child)
// - remove(child)
// - isVisibleFor(role) → true, если хотя бы один ребёнок видим для роли
// - render(indent) → выводит группу и детей, но в реальном приложении
//   было бы удобно принимать роль пользователи, например:
//   renderForRole(role: UserRole, indent?: number)
//   Для простоты можешь оставить render(role, indent?) или сделать отдельный метод.
class SecureMenuGroup implements ISecureMenuComponent {
  private label: string;
  private children: ISecureMenuComponent[] = [];
  constructor(label: string) {
    this.label = label;
  }
  add(child: ISecureMenuComponent): void {
    this.children.push(child);
  }
  remove(child: ISecureMenuComponent): void {
    this.children = this.children.filter((c) => c !== child);
  }
  isVisibleFor(role: TUserRole): boolean {
    return this.children.some((child) => child.isVisibleFor(role));
  }
  render(indent: number = 0): void {
    console.log(`${" ".repeat(indent)}+ ${this.label}`);
    this.children.forEach((child) => child.render(indent + 2));
  }

  renderForRole(role: TUserRole, indent: number = 0): void {
    if (this.isVisibleFor(role)) {
      console.log(`${" ".repeat(indent)}+ ${this.label}`);
      this.children.forEach((child) => {
        if (child.isVisibleFor(role)) {
          child.renderForRole(role, indent + 2);
        }
      });
    }
  }
}

function demoSecureMenu() {
  const home = new SecureMenuItem("Home", "/home", ["guest", "user", "admin"]);
  const profile = new SecureMenuItem("Profile", "/profile", ["user", "admin"]);
  const admin = new SecureMenuGroup("Admin");
  const users = new SecureMenuItem("Users", "/admin/users", ["admin"]);
  const settings = new SecureMenuItem("Settings", "/admin/settings", ["admin"]);
  admin.add(users);
  admin.add(settings);
  const rootMenu = new SecureMenuGroup("Root Menu");
  rootMenu.add(home);
  rootMenu.add(profile);
  rootMenu.add(admin);
  rootMenu.render();
  // TODO-6.3:
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

  function renderMenuForRole(root: ISecureMenuComponent, role: TUserRole): void {
    if (root.isVisibleFor(role)) {
      root.renderForRole(role);
    }
  }
  renderMenuForRole(rootMenu, "guest")
  renderMenuForRole(rootMenu, "user")
  renderMenuForRole(rootMenu, "admin")
}
demoSecureMenu();
