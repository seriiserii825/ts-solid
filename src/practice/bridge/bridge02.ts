// ===============================
// 2) Файловый логгер
// -------------------------------
// Абстракция: Logger (info, error)
// Реализация: FileWriter, ConsoleWriter, HttpWriter
// ЗАДАЧА: Реализовать Logger так, чтобы можно было менять writer,
// не меняя класс Logger.

interface Channel {
  send(message: string): void;
}

class FileWriterChannel implements Channel {
  send(message: string) {
    console.log("FILE:", message);
  }
}

class ConsoleWriterChannel implements Channel {
  send(message: string) {
    console.log("CONSOLE:", message);
  }
}

class HttpWriterChannel implements Channel {
  send(message: string) {
    console.log("HTTP:", message);
  }
}

abstract class Logger {
  constructor(protected channel: Channel) {}
  abstract log(message: string): void;
}

class InfoLogger extends Logger {
  log(message: string) {
    this.channel.send("INFO: " + message);
  }
}
class ErrorLogger extends Logger {
  log(message: string) {
    this.channel.send("ERROR: " + message);
  }
}

const file_writer = new FileWriterChannel()
const console_writer = new ConsoleWriterChannel()
const http_writer = new HttpWriterChannel()

new InfoLogger(file_writer).log("Success file writer")
new InfoLogger(console_writer).log("Success console writer")
new InfoLogger(http_writer).log("Success http writer")
new ErrorLogger(http_writer).log("Error http writer")
new ErrorLogger(file_writer).log("Error file writer")
new ErrorLogger(console_writer).log("Error console writer")

