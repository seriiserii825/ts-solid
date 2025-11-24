// ===========================
// ЗАДАЧА 1 — История команд в фоторедакторе
// ---------------------------
// Есть класс PhotoEditor:
//   - increaseBrightness()
//   - decreaseBrightness()
//   - rotate(deg: number)
//   - crop(w: number, h: number)
//
// Требования:
//   1. Создать систему команд (increase, decrease, rotate, crop).
//   2. Каждая команда должна поддерживать undo().
//   3. Создать HistoryInvoker, который:
//        - execute(cmd)
//        - undo()
//        - redo()
//   4. Симулировать последовательность действий:
//        - brighten ×2
//        - rotate 90°
//        - crop 300x300
//      Затем отменить последние 2 команды.
// 
// Цель: потренировать вызовы execute(), undo(), redo() и хранение истории.
// ===========================

interface Command {
  execute(): void;
  undo(): void; // опционально, если нужно Undo
}

class PhotoEditor {
  private brightness: number = 0;
  private rotation: number = 0;
  private cropDimensions: { width: number; height: number } | null = null;

  increaseBrightness() {
    this.brightness++;
    console.log(`Brightness increased to ${this.brightness}`);
  }

  decreaseBrightness() {
    this.brightness--;
    console.log(`Brightness decreased to ${this.brightness}`);
  }

  rotate(deg: number) {
    this.rotation = (this.rotation + deg) % 360;
    console.log(`Rotated to ${this.rotation} degrees`);
  }

  crop(w: number, h: number) {
    this.cropDimensions = { width: w, height: h };
    console.log(`Cropped to ${w}x${h}`);
  }
}

class IncreaseBrightnessCommand implements Command {
  constructor(private editor: PhotoEditor) {}

  execute() {
    this.editor.increaseBrightness();
  }

  undo() {
    this.editor.decreaseBrightness();
  }
}
class RotateCommand implements Command {
  constructor(private editor: PhotoEditor, private degrees: number) {}

  execute() {
    this.editor.rotate(this.degrees);
  }

  undo() {
    this.editor.rotate(-this.degrees);
  }
}
class CropCommand implements Command {
  private previousDimensions: { width: number; height: number } | null = null;

  constructor(private editor: PhotoEditor, private width: number, private height: number) {}

  execute() {
    // Сохраняем предыдущие размеры для undo
    this.previousDimensions = { width: this.width, height: this.height };
    this.editor.crop(this.width, this.height);
  }

  undo() {
    if (this.previousDimensions) {
      this.editor.crop(this.previousDimensions.width, this.previousDimensions.height);
    }
  }
}
class HistoryInvoker {
  private history: Command[] = [];
  private undone: Command[] = [];

  executeCommand(cmd: Command) {
    cmd.execute();
    this.history.push(cmd);
    this.undone = []; // Очистить redo стек
  }

  undo() {
    const cmd = this.history.pop();
    if (cmd) {
      cmd.undo();
      this.undone.push(cmd);
    }
  }

  redo() {
    const cmd = this.undone.pop();
    if (cmd) {
      cmd.execute();
      this.history.push(cmd);
    }
  }
}

// Симуляция
const editor = new PhotoEditor();
const history = new HistoryInvoker();
history.executeCommand(new IncreaseBrightnessCommand(editor));
history.executeCommand(new IncreaseBrightnessCommand(editor));
history.executeCommand(new RotateCommand(editor, 90));
history.executeCommand(new CropCommand(editor, 300, 300));
history.undo(); // Отменить crop
history.undo(); // Отменить rotate
history.redo(); // Повторить rotate

