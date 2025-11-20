// ===============================
// 10) Игровые юниты
// -------------------------------
// Абстракция: Unit (attack())
// Реализация: SwordWeapon, BowWeapon, MagicWeapon
// ЗАДАЧА: Разные юниты (Warrior, Archer, Wizard) должны использовать разные Weapon-реализации
// без изменения базового кода юнита.

interface Weapon {
    attack(): string;
}

class SwordWeapon implements Weapon {
    attack(): string {
        return "Attacks with a sword!";
    }
}
class BowWeapon implements Weapon {
    attack(): string {
        return "Attacks with a bow!";
    }
}
class MagicWeapon implements Weapon {
    attack(): string {
        return "Casts a magic spell!";
    }
}
abstract class Unit {
    protected weapon: Weapon;

    constructor(weapon: Weapon) {
        this.weapon = weapon;
    }

    abstract attack(): string;
}
class Warrior extends Unit {
    attack(): string {
        return `Warrior: ${this.weapon.attack()}`;
    }
}
class Archer extends Unit {
    attack(): string {
        return `Archer: ${this.weapon.attack()}`;
    }
}
class Wizard extends Unit {
    attack(): string {
        return `Wizard: ${this.weapon.attack()}`;
    }
}
// Клиентский код
const sword = new SwordWeapon();
const bow = new BowWeapon();
const magic = new MagicWeapon();
const warrior = new Warrior(sword);
const archer = new Archer(bow);
const wizard = new Wizard(magic);
console.log(warrior.attack()); // Warrior: Attacks with a sword!
console.log(archer.attack());  // Archer: Attacks with a bow!
console.log(wizard.attack());  // Wizard: Casts a magic spell!
