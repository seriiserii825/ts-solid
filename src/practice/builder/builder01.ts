type TPizzaSize = "small" | "medium" | "large";
interface IPizzaBuilder {
  setSize(size: TPizzaSize): this;
  addCheese(cheese: boolean): this;
  addPepperoni(pepperoni: boolean): this;
  addMushrooms(mushrooms: boolean): this;
  addOlives(olives: boolean): this;
}

class Pizza {
  constructor(
    public size: TPizzaSize,
    public cheese: boolean,
    public pepperoni: boolean,
    public mushrooms: boolean,
    public olives: boolean,
  ) {}
}

class PizzaBuilder implements IPizzaBuilder {
  private size: TPizzaSize = "medium";
  private cheese: boolean = false;
  private pepperoni: boolean = false;
  private mushrooms: boolean = false;
  private olives: boolean = false;

  setSize(size: TPizzaSize): this {
    this.size = size;
    return this;
  }
  addCheese(cheese: boolean): this {
    this.cheese = cheese;
    return this;
  }
  addPepperoni(pepperoni: boolean): this {
    this.pepperoni = pepperoni;
    return this;
  }
  addMushrooms(mushrooms: boolean): this {
    this.mushrooms = mushrooms;
    return this;
  }
  addOlives(olives: boolean): this {
    this.olives = olives;
    return this;
  }

  build(): Pizza {
    return new Pizza(this.size, this.cheese, this.pepperoni, this.mushrooms, this.olives);
  }
}

class PizzaDirector {
  static makeMargarita(builder: PizzaBuilder): Pizza {
    return builder
      .setSize("medium")
      .addCheese(true)
      .addPepperoni(false)
      .addMushrooms(false)
      .addOlives(false)
      .build();
  }
}

const pizzaBuilder = new PizzaBuilder();
const customPizza = pizzaBuilder
  .setSize("large")
  .addCheese(true)
  .addPepperoni(true)
  .addMushrooms(false)
  .addOlives(true)
  .build();

console.log("Custom Pizza:", customPizza);

const directorPizza = PizzaDirector.makeMargarita(new PizzaBuilder());
console.log("directorPizza", directorPizza);


