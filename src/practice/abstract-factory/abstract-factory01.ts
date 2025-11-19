interface Button {
  render(): void;
}

interface Checkbox {
  check(): void;
}

class WinButton implements Button {
  render() {
    console.log("Rendering Windows button");
  }
}

class MacButton implements Button {
  render() {
    console.log("Rendering Mac button");
  }
}

class WinCheckbox implements Checkbox {
  check() {
    console.log("Checking Windows checkbox");
  }
}

class MacCheckbox implements Checkbox {
  check() {
    console.log("Checking Mac checkbox");
  }
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WinFactory implements GUIFactory {
  createButton() {
    return new WinButton();
  }
  createCheckbox() {
    return new WinCheckbox();
  }
}

class MacFactory implements GUIFactory {
  createButton() {
    return new MacButton();
  }
  createCheckbox() {
    return new MacCheckbox();
  }
}

function app(factory: GUIFactory) {
  const btn = factory.createButton();
  const chk = factory.createCheckbox();

  btn.render();
  chk.check();
}

const os: "mac" | "win" = Math.random() > 0.5 ? "mac" : "win";

const factory: GUIFactory = os === "win" ? new WinFactory() : new MacFactory();

app(factory);
