export default function abstraction() {
  interface Shape {
    area(): number;
    perimeter(): number;
  }

  class Circle implements Shape {
    constructor(private radius: number) {
      this.radius = radius;
    }

    area(): number {
      return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
      return 2 * Math.PI * this.radius;
    }
  }

  class Rectangle implements Shape {
    private width: number;
    private height: number;
    constructor(width: number, height: number) {
      this.width = width;
      this.height = height;
    }

    area() {
      return this.width * this.height;
    }

    perimeter() {
      return (this.width + this.height) * 2;
    }
  }

  function calculateArea(shape: Shape): number {
    return shape.area();
  }
  function calculatePerimeter(shape: Shape): number {
    return shape.perimeter();
  }

  const circle: Circle = new Circle(5)
  const rectangle: Rectangle = new Rectangle(4, 8)
  console.log(`Circle Area: ${calculateArea(circle)}`);
  console.log(`Circle Perimeter: ${calculatePerimeter(circle)}`);
  console.log(`Rectangle Area: ${calculateArea(rectangle)}`);
  console.log(`Rectangle Perimeter: ${calculatePerimeter(rectangle)}`);
}
