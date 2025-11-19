// ---------------------------------------------
// Задача 1 — Создание пользователей
// ❌ Плохой код:
function createUser(type: string) {
  if (type === "admin") {
    return { role: "admin", permissions: ["read", "write", "delete"] };
  }
  if (type === "editor") {
    return { role: "editor", permissions: ["read", "write"] };
  }
  if (type === "viewer") {
    return { role: "viewer", permissions: ["read"] };
  }
}
// 🎯 Задача: Сделать UserFactory, убрать if

type UserRole = "admin" | "editor" | "viewer";

interface IUser {
  role: UserRole;
  permissions: string[];
}

class UserFactory {
  create(type: UserFactoryType): IUser {
    switch (type) {
      case "admin":
        return new Admin()
      case "editor":
        return new Editor()
      case "viewer":
        return new Viewer()
      default:
        const _exhaustiveCheck: never = type;
        throw new Error(`Unknown user type: ${type}`);
    }
  }
}

type UserFactoryType = UserRole;

class Admin implements IUser {
  role: UserRole = "admin";
  permissions = ["read", "write", "delete"];
}
class Editor implements IUser {
  role: UserRole = "editor";
  permissions = ["read", "write"];
}
class Viewer implements IUser {
  role: UserRole = "viewer";
  permissions = ["read"];
}

const userFactory = new UserFactory();

const adminUser = userFactory.create("admin");
const editorUser = userFactory.create("editor");
const viewerUser = userFactory.create("viewer");
