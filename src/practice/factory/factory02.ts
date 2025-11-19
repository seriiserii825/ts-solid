// ---------------------------------------------
// Задача 2 — Генерация кнопок
// ❌ Плохой код:
function generateButton(type: string) {
  if (type === "primary") return new PrimaryButton();
  if (type === "secondary") return new SecondaryButton();
  if (type === "danger") return new DangerButton();
}
// 🎯 Задача: Создать ButtonFactory

type TButtonType = "primary" | "secondary" | "danger";

interface IButton {
  color: string;
  log(): void;
}

class PrimaryButton implements IButton {
  color = "blue";
  log() {
    console.log(this.color);
  }
}
class SecondaryButton implements IButton {
  color = "green";
  log() {
    console.log(this.color);
  }
}
class DangerButton implements IButton {
  color = "red";
  log() {
    console.log(this.color);
  }
}

class ButtonFactory {
  create(type: TButtonType): IButton {
    switch (type) {
      case "primary":
        return new PrimaryButton()

      case "secondary":
        return new SecondaryButton()

      case "danger":
        return new DangerButton()

      default:
        const _exhaust: never = type;
        throw new Error(`No such button type: ${_exhaust}`);
    }
  }
}

const buttonFactory = new ButtonFactory();
const primaryButton = buttonFactory.create("primary");
primaryButton.log(); // "blue"
const dangerButton = buttonFactory.create("danger");
dangerButton.log(); // "red"
const secondaryButton = buttonFactory.create("secondary");
secondaryButton.log(); // "green"

