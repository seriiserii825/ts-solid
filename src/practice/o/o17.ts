// =============================
// Задача 7 — MessageBuilder (локализация/многоязычность)
// -----------------------------
// Сейчас сообщения поддерживают только "en" и "it" через if.
// ЗАДАЧА: сделать архитектуру, в которой можно:
//   - легко добавлять новые локали (ru, de, fr и т.д.)
//   - переиспользовать разные шаблоны (приветствие, напоминания и т.п.)
//   - НЕ менять MessageBuilder при добавлении новой локали.

interface MessageTemplate {
  build(name: string): string;
}

class EnglishGreeting implements MessageTemplate {
  build(name: string) {
    return `Hello, ${name}!`;
  }
}

class ItalianGreeting implements MessageTemplate {
  build(name: string) {
    return `Ciao, ${name}!`;
  }
}

class FrenchGreeting implements MessageTemplate {
  build(name: string) {
    return `Bonjour, ${name}!`;
  }
}

class MessageBuilder {
  private templates: { [key: string]: MessageTemplate } = {};
  registerTemplate(locale: string, template: MessageTemplate) {
    this.templates[locale] = template;
  }
  buildMessage(locale: string, name: string): string {
    const template = this.templates[locale];
    if (template) {
      return template.build(name);
    }
    return `Hello, ${name}!`; // default to English
  }
}

const builder = new MessageBuilder();
builder.registerTemplate("en", new EnglishGreeting());
builder.registerTemplate("it", new ItalianGreeting());
builder.registerTemplate("fr", new FrenchGreeting());

console.log(builder.buildMessage("en", "John")); // Hello, John!
console.log(builder.buildMessage("it", "Giovanni")); // Ciao, Giovanni!
console.log(builder.buildMessage("fr", "Jean")); // Bonjour, Jean!
