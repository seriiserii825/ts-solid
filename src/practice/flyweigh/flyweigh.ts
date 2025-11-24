// 🎨 Представим, что у нас 100k кнопок в UI
// Внутреннее состояние (общие данные):
//
// иконка
// форма
// базовый стиль
//
// Внешнее (уникальное):
//
// текст
// позиция
// действие при клике

class ButtonFlyweight {
  constructor(
    private icon: string,
    private shape: string,
    private baseColor: string,
  ) {}

  render(label: string, x: number, y: number) {
    console.log(`Render button [${label}] at (${x},${y}) with icon=${this.icon}`);
  }
}

class ButtonFlyweightFactory {
  private cache: Record<string, ButtonFlyweight> = {};

  getFlyweight(icon: string, shape: string, color: string) {
    const key = `${icon}_${shape}_${color}`;

    if (!this.cache[key]) {
      this.cache[key] = new ButtonFlyweight(icon, shape, color);
    }

    return this.cache[key];
  }
}

// --- usage ---
const factory = new ButtonFlyweightFactory();

// 100k кнопок, но создадим лишь 3 разных flyweight-а
for (let i = 0; i < 100000; i++) {
  const type = i % 3;
  const fw = factory.getFlyweight("icon.svg", "round", ["red", "blue", "green"][type]);
  fw.render(`Button ${i}`, i % 100, Math.floor(i / 100));
}
// Мы создаём 100 000 кнопок, но реальные объекты ButtonFlyweight в памяти — только 3.
