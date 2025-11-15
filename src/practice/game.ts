export default function game() {
  class Character {
    name: string;
    weapon: Weapon;
    constructor(name: string, weapon: Weapon) {
      this.name = name;
      this.weapon = weapon;
    }

    changeWeapon(weapon: Weapon) {
      this.weapon = weapon;
    }

    attack() {
      this.weapon.attack();
    }
  }

  interface Attacker {
    attack(): void;
  }

  class Weapon implements Attacker {
    damage: number;

    constructor(damage: number) {
      this.damage = damage;
    }

    attack(): void {}
  }

  class Sword extends Weapon {
    constructor(damage: number) {
      super(damage);
    }
    attack(): void {
      console.log(`Sword attack with damage: ${this.damage}`);
    }
  }

  class Arbalet extends Weapon {
    constructor(damage: number) {
      super(damage)
    }
    attack(): void {
      console.log(`Arbalet attack with damage: ${this.damage}`);
    }
  }


  const sword = new Sword(30);
  const arbalet = new Arbalet(20);
  const char = new Character("char", sword);
  char.attack();
  char.changeWeapon(arbalet);
  char.attack();
}
