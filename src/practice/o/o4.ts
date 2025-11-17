// 4) Рендер разных форм
// Есть класс ShapeRenderer, который рендерит Circle и Square.
//
// Требование: добавь Triangle, Hexagon, Star
// и сделай так, чтобы рендерер не приходилось менять.

interface Shape {
  render(): void;
}

class Circle implements Shape {
  render(): void {
    console.log("render circle");
  }
}
class Square implements Shape {
  render(): void {
    console.log("render square");
  }
}
class Triangle implements Shape {
  render(): void {
    console.log("render triangle");
  }
}
class Star implements Shape {
  render(): void {
    console.log("render star");
  }
}

class ShapeRenderer {
  shapes: Shape[] = [new Circle(), new Square(), new Triangle(), new Star()];
  renderShapes(shapes: Shape[]): void {
    shapes.forEach((shape) => shape.render());
  }
}
const renderer = new ShapeRenderer();
renderer.renderShapes(renderer.shapes);
