// Задача 5. Payment + Logging + DB
// ts
// Копировать код
// class PaymentService {
//   pay(amount: number) {
//     console.log("Payment started");
//     // write to DB
//     // call external API
//     console.log("Payment finished");
//   }
// }
// 🔧 Твоя задача:
// Спроектировать систему, где:
// PaymentService отвечает только за оплату
// логирование вынесено вне
// запись в БД вынесена вне
// Опиши структуру классов.

class Logger {
  log(message: string) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  }
}

class DataBase {
  save(data: any) {
    console.log("Saving to database:", data);
  }
}

class Fetcher {
  callExternalApi(amount: number) {
    console.log(`Calling external API for amount: ${amount}`);
  }
}

class PaymentService {
  private logger: Logger;
  private database: DataBase;
  private fetcher: Fetcher;

  constructor(logger: Logger, database: DataBase, fetcher: Fetcher) {
    this.logger = logger;
    this.database = database;
    this.fetcher = fetcher;
  }

  pay(amount: number) {
    this.logger.log("Payment started");
    this.database.save({ amount });
    this.fetcher.callExternalApi(amount);
    this.logger.log("Payment finished");
  }
}

const paymentService = new PaymentService(new Logger(), new DataBase(), new Fetcher());
paymentService.pay(100);

