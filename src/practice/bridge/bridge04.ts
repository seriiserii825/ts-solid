// ===============================
// 4) Фронтенд компоненты
// -------------------------------
// Абстракция: UIComponent (render())
// Реализация: LightTheme, DarkTheme
// ЗАДАЧА: Сделать Button, Card, Input — но применяемую тему вынести в реализацию.

interface Theme {
    getColorScheme(): string;
}

class LightTheme implements Theme {
    getColorScheme(): string {
        return "Light Theme: White background with black text.";
    }
}

class DarkTheme implements Theme {
    getColorScheme(): string {
        return "Dark Theme: Black background with white text.";
    }
}

abstract class UIComponent {
  constructor(protected theme: Theme) {}
  abstract render(): void;
}

class Button extends UIComponent {
    render(): void {
        console.log("Rendering Button with " + this.theme.getColorScheme());
    }
}

class Card extends UIComponent {
    render(): void {
        console.log("Rendering Card with " + this.theme.getColorScheme());
    }
}

class Input extends UIComponent {
    render(): void {
        console.log("Rendering Input with " + this.theme.getColorScheme());
    }
}

const lightTheme = new LightTheme();
const darkTheme = new DarkTheme();
new Button(lightTheme).render();
new Card(darkTheme).render();
new Input(lightTheme).render();
new Button(darkTheme).render();
