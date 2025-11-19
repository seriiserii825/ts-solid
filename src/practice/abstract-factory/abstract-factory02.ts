// Задача: Abstract Factory — Light/Dark Theme

interface Button {
  render(): void;
}
interface Card {
  display(): void;
}

interface ThemeFactory {
  createButton(): Button;
  createCard(): Card;
}

class LightButton implements Button {
  render() {
    console.log("Rendering Light Theme Button");
  }
}

class DarkButton implements Button {
  render() {
    console.log("Rendering Dark Theme Button");
  }
}

class LightCard implements Card {
  display() {
    console.log("Displaying Light Theme Card");
  }
}

class DarkCard implements Card {
  display() {
    console.log("Displaying Dark Theme Card");
  }
}

class LightFactory implements ThemeFactory {
  createButton() {
    return new LightButton();
  }
  createCard() {
    return new LightCard();
  }
}

class DarkFactory implements ThemeFactory {
  createButton() {
    return new DarkButton();
  }
  createCard() {
    return new DarkCard();
  }
}

function app(factory: ThemeFactory) {
  const button = factory.createButton();
  const card = factory.createCard();

  button.render();
  card.display();
}

const factory = new DarkFactory();
app(factory);
