// =============================
// Задача 2 — OrderProcessor (разные типы заказов)
// -----------------------------
// Есть обработчик заказов, который сейчас поддерживает только
// "physical" и "digital" через if.
// ЗАДАЧА: реализовать архитектуру, в которой можно легко
// добавлять новые типы заказов: "subscription", "preorder", "service",
// НЕ изменяя OrderProcessor (по OCP).

type Order = {
  id: number;
  userId: number;
};

interface OrderHandler {
  handle(order: Order): void;
}

class PhysicalOrderHandler implements OrderHandler {
  handle(order: Order) {
    console.log(`Создать доставку для заказа ${order.id}`);
  }
}

class DigitalOrderHandler implements OrderHandler {
  handle(order: Order) {
    console.log(`Отправить ссылку на скачивание для заказа ${order.id}`);
  }
}

class OrderProcessor {
  process(order: Order) {
    const handlers: OrderHandler[] = [new PhysicalOrderHandler(), new DigitalOrderHandler()];

    for (const handler of handlers) {
      handler.handle(order);
    }
  }
}

const orderProcessor = new OrderProcessor();
orderProcessor.process({ id: 1, userId: 3 });
