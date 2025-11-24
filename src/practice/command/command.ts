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

