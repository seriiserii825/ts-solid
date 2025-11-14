export default {};

class BankAccount {
  private _balance: number;
  constructor(initialBalance: number) {
    this._balance = initialBalance;
  }
  public deposit(amount: number): void {
    if (amount > 0) {
      this._balance += amount;
    } else {
      console.log("Deposit amount must be positive.");
    }
  }
  public withdraw(amount: number): void {
    if (amount > 0 && amount <= this._balance) {
      this._balance -= amount;
    } else {
      console.log("Insufficient funds or invalid withdrawal amount.");
    }
  }

  public getBalance(): number {
    return this._balance;
  }
}

const myAccount = new BankAccount(1000);
myAccount.deposit(500);
myAccount.withdraw(200);
console.log("Current Balance:", myAccount.getBalance());
