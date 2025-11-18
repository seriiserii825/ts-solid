// Задача 2 — Bird / Penguin
// -------------------------
// Не все птицы умеют летать, но от Bird ожидается метод fly().
// Penguin нарушает LSP, если переопределяет fly с throw.
// TODO: Разделить поведение так, чтобы нелетающие птицы
// можно было использовать без "битого" метода fly().

class FlyerBird {
  fly() {
    console.log("I am flying");
  }
}

class NonFlyerBird {
  swim() {
    console.log("I am swimming");
  }
}

class Sparrow extends FlyerBird {}

class Penguin extends NonFlyerBird {
  swim() {
    console.log("I am swimming");
  }
}

function makeBirdFly(bird: FlyerBird) {
  bird.fly();
}

// TODO: Перепроектировать так, чтобы Penguin тоже был подстановочным типом,
// но не ломал ожидания makeBirdFly.


