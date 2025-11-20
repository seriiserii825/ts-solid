export default function loggerAdapter() {
  // =========================
  // Задача 1 — Логгер
  // -------------------------
  // У тебя есть интерфейс нового логера:
  interface ILogger {
    log(message: string): void;
  }

  class NewerLogger implements ILogger {
    log(message: string) {
      console.log("New logger: ", message)
    }
  }

  // И есть старый логер:
  class LegacyLogger {
    write(msg: string) {
      console.log("LEGACY:", msg);
    }
  }

  // ❗ ЗАДАЧА:
  // Сделать адаптер LegacyLogger → ILogger,
  // чтобы можно было передавать адаптер в функцию:

  interface ILegacyLogger {
    write(msg: string): void;
  }

  class LoggerAdapter implements ILogger {
    constructor(private legacy_logger: ILegacyLogger) {}

    log(msg: string) {
      this.legacy_logger.write(msg);
    }
  }

  function processLogger(logger: ILogger, message: string) {
    logger.log(message);
  }

  const new_logger = new NewerLogger()

  const old_logger = new LegacyLogger();
  const logger_adapter = new LoggerAdapter(old_logger);

  processLogger(new_logger, "some");
  processLogger(logger_adapter, "some");
  // processLogger(old_logger, "some")
}
