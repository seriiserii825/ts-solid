interface Image {
  display(): void;
}

class RealImage implements Image {
  constructor(private filename: string) {
    console.log("Loading large image:", filename);
  }

  display() {
    console.log("Displaying:", this.filename);
  }
}

class ImageProxy implements Image {
  private realImage: RealImage | null = null;

  constructor(private filename: string) {}

  display() {
    if (!this.realImage) {
      this.realImage = new RealImage(this.filename); // ленивое создание
    }
    this.realImage.display();
  }
}

// --- client ---
const img = new ImageProxy("photo.jpg");
img.display(); // загружает и показывает
img.display(); // показывает, но не загружает снова
