// 🧩 Задача 8 — Логгер, который всё делает сам
// ts
// Копировать код
// class Logger {
//   private logs: string[] = [];
//
//   log(message: string) {
//     const full = `[${new Date().toISOString()}] ${message}`;
//     this.logs.push(full);
//     console.log(full);
//     Deno.writeTextFileSync("app.log", this.logs.join("\n"));
//   }
// }
// Твоя задача:
// Опиши, какие здесь разные обязанности (форматирование, хранение, вывод, запись в файл) и как бы ты разделил это на несколько классов/компонентов по SRP.

class LogWritter {
  writeToFile(message: string, file_path: string) {
    Deno.writeTextFileSync(file_path, message);
  }
}
class Logger {
  private logs: string[] = [];
  private writer: LogWritter;

  constructor(writer: LogWritter) {
    this.writer = writer
  }

  log(message: string) {
    const full = `[${new Date().toISOString()}] ${message}`;
    this.logs.push(full);
    this.writer.writeToFile(this.logs.join("\n"), "app.log")
  }
}
