// =============================
// Задача 10 — AccessControl (ACL, роли и права)
// -----------------------------
// Сейчас есть две роли и три действия, логика зашита в if.
// ЗАДАЧА: сделать систему прав, в которой можно:
//   - добавлять новые роли (guest, editor, manager и т.д.)
//   - добавлять новые действия (export, archive, restore и др.)
//   - НЕ переписывать метод can при добавлении новых ролей/действий.

type Role = "admin" | "user";

class AccessControl {
  can(role: Role, action: "read" | "write" | "delete"): boolean {
    if (role === "admin") return true;
    if (role === "user") return action === "read";
    return false;
  }
}

const acl = new AccessControl();
acl.can("admin", "delete");
