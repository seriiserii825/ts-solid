// 🎯 Требования
// Создай ButtonBuilder со следующими методами:
//
// Fluent-методы
// setText(text: string): this
//
// setColor(color: string): this
//
// setSize(size: "small" | "medium" | "large"): this
//
// setRounded(value: boolean): this
//
// Финальный метод
// build() — возвращает объект вида:
//
// ts
// Copy code
// {
//   text: string;
//   color: string;
//   size: "small" | "medium" | "large";
//   rounded: boolean;
// }
// 📌 Пример использования (должно работать)
// ts
// Copy code
// const btn = new ButtonBuilder()
//   .setText("Buy")
//   .setColor("green")
//   .setSize("medium")
//   .setRounded(true)
//   .build();
// ✏️ Твоя задача
// Создать класс ButtonBuilder
//
// Реализовать все fluent-методы
//
// Реализовать метод build
//
// Проверить, чтобы пример выше работал
