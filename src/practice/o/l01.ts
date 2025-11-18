// Задача 1 — Rectangle / Square
// -----------------------------
// Класс Square "ломает" поведение Rectangle (ширина/высота зависимы).
// TODO: Перепроектировать иерархию так, чтобы:
//  - любой Square можно было передать туда, где ожидают Rectangle
//  - и не ломались ожидания к сеттерам/getters.
// (Можно вообще уйти от наследования, если нужно.)

class Rectangle {
  constructor(public width: number, public height: number) {}

  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(width: number) {
    this.width = width;
  }

  setHeight(height: number) {
    this.height = height;
  }
}

function printArea(rect: Rectangle) {
  rect.setWidth(5);
  rect.setHeight(4);
  console.log(rect.getArea());
}

// TODO: Исправить дизайн так, чтобы LSP не нарушался.


