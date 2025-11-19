// ---------------------------------------------
// Задача 3 — Логгер
// ❌ Плохой код:
function getLogger(env: string) {
  if (env === "dev") return new ConsoleLogger();
  if (env === "prod") return new FileLogger();
  if (env === "test") return new DummyLogger();
}
// 🎯 Задача: Создать LoggerFactory



// ---------------------------------------------
// Задача 4 — Оплата
// ❌ Плохой код:
function pay(method: string) {
  if (method === "paypal") return new PayPal();
  if (method === "stripe") return new Stripe();
  if (method === "cash") return new Cash();
}
// 🎯 Задача: Создать PaymentFactory



// ---------------------------------------------
// Задача 5 — Уведомления
// ❌ Плохой код:
function sendNotification(type: string) {
  if (type === "sms") return new SmsSender();
  if (type === "email") return new EmailSender();
  if (type === "telegram") return new TelegramSender();
}
// 🎯 Задача: Создать NotificationFactory



// ---------------------------------------------
// Задача 6 — Животные
// ❌ Плохой код:
function createAnimal(kind: string) {
  if (kind === "dog") return new Dog();
  if (kind === "cat") return new Cat();
  if (kind === "bird") return new Bird();
}
// 🎯 Задача: Создать AnimalFactory



// ---------------------------------------------
// Задача 7 — Формы
// ❌ Плохой код:
function createForm(fieldType: string) {
  if (fieldType === "text") return new TextField();
  if (fieldType === "password") return new PasswordField();
  if (fieldType === "email") return new EmailField();
}
// 🎯 Задача: Переписать на FormFieldFactory



// ---------------------------------------------
// Задача 8 — Транспорт
// ❌ Плохой код:
function getTransport(type: string) {
  if (type === "car") return new Car();
  if (type === "bike") return new Bike();
  if (type === "truck") return new Truck();
}
// 🎯 Задача: Создать TransportFactory



// ---------------------------------------------
// Задача 9 — Парсеры
// ❌ Плохой код:
function parse(fileType: string) {
  if (fileType === "json") return new JsonParser();
  if (fileType === "csv") return new CsvParser();
  if (fileType === "xml") return new XmlParser();
}
// 🎯 Задача: Сделать ParserFactory



// ---------------------------------------------
// Задача 10 — Анимации GSAP
// ❌ Плохой код:
function runAnimation(block: string) {
  if (block === "home-intro") return new HomeIntroAnimation();
  if (block === "page-intro") return new PageIntroAnimation();
  if (block === "contacts-block") return new ContactsBlockAnimation();
}
// 🎯 Задача: Создать AnimationFactory
