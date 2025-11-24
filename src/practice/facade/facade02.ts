// 2) Facade для чекаута интернет-магазина
// Подсистемы: CartService, DeliveryService, PaymentService, InvoiceGenerator
// Задача: сделать CheckoutFacade.process(userId), который скрывает все шаги.
// ---------------------------------------------

class CartService {
  getCart(userId: string): string[] {
    console.log(`Fetching cart for user ${userId}...`);
    return ["item1", "item2", "item3"];
  }
}
class DeliveryService {
  arrangeDelivery(items: string[]): string {
    console.log("Arranging delivery for items:", items);
    return "delivery123";
  }
}

class PaymentService {
  processPayment(userId: string, amount: number): string {
    console.log(`Processing payment of $${amount} for user ${userId}...`);
    return "payment123";
  }
}
class InvoiceGenerator {
  generateInvoice(userId: string, items: string[], paymentId: string): string {
    console.log(`Generating invoice for user ${userId} with payment ${paymentId}...`);
    return "invoice123";
  }
}

class CheckoutFacade {
  constructor(
    private cartService: CartService,
    private deliveryService: DeliveryService,
    private paymentService: PaymentService,
    private invoiceGenerator: InvoiceGenerator
  ) {}
  process(userId: string): void {
    const items = this.cartService.getCart(userId);
    const deliveryId = this.deliveryService.arrangeDelivery(items);
    const paymentId = this.paymentService.processPayment(userId, items.length * 20); // Assume each item is $20
    const invoiceId = this.invoiceGenerator.generateInvoice(userId, items, paymentId);

    console.log("Checkout completed:");
    console.log(`Delivery ID: ${deliveryId}`);
    console.log(`Payment ID: ${paymentId}`);
    console.log(`Invoice ID: ${invoiceId}`);
  }
}

const checkout = new CheckoutFacade(
  new CartService(),
  new DeliveryService(),
  new PaymentService(),
  new InvoiceGenerator()
);
checkout.process("user123");
