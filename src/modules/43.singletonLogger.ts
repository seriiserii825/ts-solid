export default function singletonLogger() {
  class Logger {
    private static instance: Logger;
    private constructor() {}
    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }

    public log(message: string) {
      const timestamp = new Date().toLocaleString();
      console.log(`[${timestamp}]: - ${message}`);
    }
  }

  const logger_1 = Logger.getInstance();
  logger_1.log("First message");
  setTimeout(() => {
    logger_1.log("second message")
  }, 1000)
}
