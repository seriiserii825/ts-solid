// 3) Есть Logger.log(msg).
//    Создай TimestampDecorator, который добавляет дату перед сообщением.
//    Пример: [2025-11-20] msg

interface Logger {
    log(msg: string): void;
}

class SimpleLogger implements Logger {
    log(msg: string): void {
        console.log(msg);
    }
}

class TimestampDecorator implements Logger {
    private logger: Logger;

    constructor(logger: Logger) {
        this.logger = logger;
    }

    log(msg: string): void {
        const timestamp = new Date().toISOString().split('T')[0];
        this.logger.log(`[${timestamp}] ${msg}`);
    }
}

const logger: Logger = new TimestampDecorator(new SimpleLogger());
logger.log("This is a log message.");
