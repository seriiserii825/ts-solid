// ===========================
// ЗАДАЧА 2 — Универсальный Hotkey Manager
// ---------------------------
// Представь, что у тебя есть приложение со следующими действиями:
//   - openSettings()
//   - saveDocument()
//   - closeTab()
//   - toggleTheme()
//
// Задача:
//   1. Создать интерфейс ICommand { execute(): void }.
//   2. На каждое действие — отдельная команда.
//   3. Создать HotkeyInvoker, который:
///       register(key: string, command: ICommand)
//        handle(key: string) — вызывает command.execute()
//   4. Зарегистрировать команды:
//        "Ctrl+S" → SaveDocumentCommand
//        "Ctrl+W" → CloseTabCommand
//        "Ctrl+Shift+T" → ToggleThemeCommand
//   5. Смоделировать вызовы:
//        handle("Ctrl+S")
//        handle("Ctrl+Shift+T")
//        handle("Ctrl+S")
//
// Цель: понять, как Command помогает отвязать UI-слой (клавиши/кнопки) от бизнес-логики.
// ===========================

interface ICommand {
  execute(): void;
}

class Application {
  openSettings() {
    console.log("Settings opened");
  }
  saveDocument() {
    console.log("Document saved");
  }
  closeTab() {
    console.log("Tab closed");
  }
  toggleTheme() {
    console.log("Theme toggled");
  }
}

class OpenSettingsCommand implements ICommand {
  constructor(private app: Application) {}
  execute() {
    this.app.openSettings();
  }
}
class SaveDocumentCommand implements ICommand {
  constructor(private app: Application) {}
  execute() {
    this.app.saveDocument();
  }
}
class CloseTabCommand implements ICommand {
  constructor(private app: Application) {}
  execute() {
    this.app.closeTab();
  }
}
class ToggleThemeCommand implements ICommand {
  constructor(private app: Application) {}
  execute() {
    this.app.toggleTheme();
  }
}
class HotkeyInvoker {
  private commands: { [key: string]: ICommand } = {};

  register(key: string, command: ICommand) {
    this.commands[key] = command;
  }

  handle(key: string) {
    const command = this.commands[key];
    if (command) {
      command.execute();
    } else {
      console.log(`No command registered for ${key}`);
    }
  }
}

const app = new Application();
const hotkeyInvoker = new HotkeyInvoker();
hotkeyInvoker.register("Ctrl+S", new SaveDocumentCommand(app));
hotkeyInvoker.register("Ctrl+W", new CloseTabCommand(app));
hotkeyInvoker.register("Ctrl+Shift+T", new ToggleThemeCommand(app));
hotkeyInvoker.handle("Ctrl+S");
hotkeyInvoker.handle("Ctrl+Shift+T");
hotkeyInvoker.handle("Ctrl+S");
