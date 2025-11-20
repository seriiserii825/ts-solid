// =========================
// Задача 6 — UI-Компонент кнопки
// -------------------------
// Твой дизайн-системный компонент ожидает интерфейс:
interface UIButtonProps {
  label: string;
  onClick(): void;
}

// Но старый компонент:
class LegacyButton {
  constructor(public text: string) {}
  handleClick() {
    console.log("Legacy button clicked");
  }
}

// ❗ ЗАДАЧА:
// Сделать адаптер между LegacyButton и UIButtonProps,
// чтобы можно было использовать LegacyButton внутри новой UI-системы.

interface ILegacyButton {
  handleClick(): void;
}

class LegacyAdapter implements UIButtonProps {
  label: string = "";
  private legacy: ILegacyButton;
  constructor(legacy: ILegacyButton, text: string) {
    this.label = text;
    this.legacy = legacy;
  }
  onClick(): void {
    this.legacy.handleClick();
  }
}

const legacyButton = new LegacyButton("Click Me");
const adaptedButton = new LegacyAdapter(legacyButton, legacyButton.text);
adaptedButton.onClick(); // Выведет: "Legacy button clicked"
