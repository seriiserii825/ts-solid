export default function calculator() {
  interface IShape {
    area(): number;
  }

  class Circle implements IShape {
    radius: number;
    constructor(radius: number) {
      this.radius = radius;
    }
    area() {
      return Math.PI * this.radius * this.radius;
    }
  }

  class Rectangle implements IShape {
    width: number;
    height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }
    area() {
      return this.width * this.height;
    }
  }

  class AreaCalculator {
    calculate(shape: IShape): number {
      return shape.area();
    }
  }

  const calc = new AreaCalculator();
  const circle = new Circle(40);
  const rectangle = new Rectangle(20, 30);
  console.log(calc.calculate(circle), "calc.calculate(circle)");
  console.log(calc.calculate(rectangle), "calc.calculate(rectangle)");
}
