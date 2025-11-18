// =============================
// Задача 4 — WebhookHandler (разные провайдеры и события)
// -----------------------------
// Сейчас есть обработчик вебхуков только для Stripe и только для
// двух типов событий. Всё зашито в if.
// ЗАДАЧА: построить архитектуру, где можно:
//   - добавлять новых провайдеров (PayPal, YooKassa, Coinbase и т.п.)
//   - добавлять новые типы событий (refund, subscription_canceled и т.д.)
// при этом НЕ менять WebhookHandler при добавлении нового провайдера/типа.

type StripeEvent = {
  provider: "stripe";
};

type EventType = "payment_succeeded" | "payment_failed";

interface EventHandler {
  handle(event: StripeEvent, type: EventType): void;
}

class StripePaymentSucceededHandler implements EventHandler {
  handle(event: StripeEvent, type: EventType) {
    console.log(`Stripe ${type.replace("_", " ")} handled ${event.provider}`);
  }
}
class StripePaymentFailedHandler implements EventHandler {
  handle(event: StripeEvent, type: EventType) {
    console.log(`Stripe ${type.replace("_", " ")} handled ${event.provider}`);
  }
}

class PayPalPaymentSucceededHandler implements EventHandler {
  handle(event: StripeEvent, type: EventType) {
    console.log(`PayPal ${type.replace("_", " ")} handled ${event.provider}`);
  }
}

class PayPalPaymentFailedHandler implements EventHandler {
  handle(event: StripeEvent, type: EventType) {
    console.log(`PayPal ${type.replace("_", " ")} handled ${event.provider}`);
  }
}

const payments = [
  "stripe_payment_succeeded",
  "stripe_payment_failed",
  "paypal_payment_succeeded",
  "paypal_payment_failed",
] as const;
type PaymentType = (typeof payments)[number];

class WebhookHandler {
  private handlers: { [key: string]: EventHandler } = {};
  private codes: PaymentType[] = ["stripe_payment_succeeded", "stripe_payment_failed", "paypal_payment_succeeded", "paypal_payment_failed"];
  constructor() {
    this.handlers[this.codes[0]] = new StripePaymentSucceededHandler();
    this.handlers[this.codes[1]] = new StripePaymentFailedHandler();
    this.handlers[this.codes[2]] = new PayPalPaymentSucceededHandler();
    this.handlers[this.codes[3]] = new PayPalPaymentFailedHandler();
  }
  handle(event: StripeEvent, type: PaymentType) {
    const handler = this.handlers[type];
    if (handler) {
      const eventType = type.split("_").slice(1).join("_") as EventType;
      handler.handle(event, eventType);
    } else {
      console.log("No handler found for this event type");
    }
  }
}

const webhookHandler = new WebhookHandler();
webhookHandler.handle({ provider: "stripe" }, "stripe_payment_succeeded");
webhookHandler.handle({ provider: "stripe" }, "stripe_payment_failed");
webhookHandler.handle({ provider: "stripe" }, "paypal_payment_succeeded");
webhookHandler.handle({ provider: "stripe" }, "paypal_payment_failed");
