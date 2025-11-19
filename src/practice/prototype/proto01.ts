// ==========
// Задача 1
// ----------
// Создай класс UserProfile с полями name, age, settings (объект).
// Реализуй метод clone() чтобы клонировать профиль.
// Создай user1 и user2 (клон). Измени user2.settings.theme —
// убедись, что user1.settings не меняется.

export default function userClone(){

interface UserClone {
  clone(): UserProfile;
}

class UserProfile implements UserClone {
  name: string;
  age: number;
  settings: object;

  constructor(name: string, age: number, settings: object) {
    this.name = name;
    this.age = age;
    this.settings = settings;
  }

  clone(): UserProfile {
    return new UserProfile(this.name, this.age, this.settings);
  }
}

const profile_1 = new UserProfile('Alice', 30, { theme: 'dark', notifications: true });
const profile_2 = profile_1.clone();
profile_2.name = 'Bob';
profile_2.settings = { ...profile_2.settings, theme: 'light' };
console.log(profile_1);
console.log(profile_2);
}
