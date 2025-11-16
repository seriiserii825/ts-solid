// Задача 2. Логирование + бизнес-логика
// Есть:
//
// ts
// Копировать код
// class OrderProcessor {
//   process(order: any) {
//     console.log("Processing order:", order);
//     // 20 lines of logic...
//     console.log("Order complete");
//   }
// }
// 🔧 Твоя задача:
// Перепроектировать так, чтобы:
//
// класс отвечал только за обработку заказа
//
// логирование выполнял другой компонент
//
// Опиши структуры классов (без реализации).

class Logger {
  log(message: string): void {
    console.log(message);
  }
}

class OrderProcessor {
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  process(order: any): void {
    this.logger.log("Processing order:", order);
    // 20 lines of logic...
    this.logger.log("Order complete");
  }
}

const order_processor = new OrderProcessor(new Logger());
order_processor.process({ id: 1, item: "Book" });
