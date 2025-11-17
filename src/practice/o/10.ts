// 10) Комиссия банка
// Есть метод:
//
// ts
// Копировать код
// getCommission(transactionType)
// с if:
//
// transfer
//
// withdraw
//
// Требование: добавь новые комиссии (crypto, card-to-card, swift) в виде расширений, не трогая старую функцию.

interface Commision {
  getCommission(amount: number): number;
}

class Transfer implements Commision {
  getCommission(amount: number): number {
    return amount * 0.01; // 1% commission 
  }
}

class Withdraw implements Commision {
  getCommission(amount: number): number {
    return amount * 0.015; // 1.5% commission
  }
}

class Crypto implements Commision {
  getCommission(amount: number): number {
    return amount * 0.02; // 2% commission
  }
}
