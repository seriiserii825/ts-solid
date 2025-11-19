// ---------------------------------------------
// Задача 3 — Логгер
// ❌ Плохой код:
function getLogger(env: string) {
  if (env === "dev") return new ConsoleLogger();
  if (env === "prod") return new FileLogger();
  if (env === "test") return new DummyLogger();
}
// 🎯 Задача: Создать LoggerFactory

interface ILogger {
  log(message: string): void;
}

class ConsoleLogger implements ILogger {
  log(message: string): void {
    console.log(`ConsoleLogger: ${message}`);
  }
}
class FileLogger implements ILogger {
  log(message: string): void {
    // Симуляция записи в файл
    console.log(`FileLogger (simulated file write): ${message}`);
  }
}
class DummyLogger implements ILogger {
  log(message: string): void {
    console.log(`DummyLogger: ${message}`);
  }
}

type TEnvType = "dev" | "prod" | "test";

class LoggerFactory {
  create(env: TEnvType): ILogger {
    switch (env) {
      case "dev":
        return new ConsoleLogger();

      case "prod":
        return new FileLogger();

      case "test":
        return new DummyLogger();

      default:
        const _exhaust: never = env;
        throw new Error(`No such logger type: ${_exhaust}`);
    }
  }
}

const loggerFactory = new LoggerFactory();
const devLogger = loggerFactory.create("dev");
devLogger.log("This is a development log."); // ConsoleLogger: This is a development log.
const prodLogger = loggerFactory.create("prod");
prodLogger.log("This is a production log."); // FileLogger (simulated file write): This is a production log.
const testLogger = loggerFactory.create("test");
testLogger.log("This is a test log."); // DummyLogger: This is a test log.
