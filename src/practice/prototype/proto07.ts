// ==========
// Задача 7
// ----------
// Создай класс Enemy в игре:
// type, hp, damage, abilities (array).
// clone().
// Создай orc → orcBoss (клон с удвоенным hp и damage).

interface EnemyClone {
  type: string;
  hp: number;
  damage: number;
  abilities: string[];
  clone(): Enemy;
}
class Enemy implements EnemyClone {
  type: string;
  hp: number;
  damage: number;
  abilities: string[];

  constructor(
    type: string,
    hp: number,
    damage: number,
    abilities: string[]
  ) {
    this.type = type;
    this.hp = hp;
    this.damage = damage;
    this.abilities = abilities;
  }

  clone(): Enemy {
    return new Enemy(
      this.type,
      this.hp,
      this.damage,
      [...this.abilities]
    );
  }
}

const orc = new Enemy('Orc', 100, 15, ['Smash', 'Roar']);
const orcBoss = orc.clone();
orcBoss.hp *= 2;
orcBoss.damage *= 2;
console.log(orc); // Enemy { type: 'Orc', hp: 100, damage: 15, abilities: [ 'Smash', 'Roar' ] }
console.log(orcBoss); // Enemy { type: 'Orc', hp: 200, damage: 30, abilities: [ 'Smash', 'Roar' ] }
