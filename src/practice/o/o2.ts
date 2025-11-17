// 2) Расчёт скидок
// Есть метод getDiscount(userType) с if/switch.
//
// Требование: добавь новые типы скидок (VIP, Weekend, Birthday).
// Но нельзя редактировать старый код и нельзя добавлять новые if/switch.

interface DiscountStrategy {
  getDiscount(): number;
}
class VIPDiscount implements DiscountStrategy {
  getDiscount(): number {
    return 0.2; // 20% discount for VIP
  }
}

class WeekendDiscount implements DiscountStrategy {
  getDiscount(): number {
    const today = new Date();
    const is_holiday = today.getDay() === 0 || today.getDay() === 6;
    return is_holiday ? 0.1 : 0;
  }
}

class BirthdayDiscount implements DiscountStrategy {
  // if for birthday i need to  pass them as parameters to getDiscount?
  // how to pass parameters without changing the old code?
  getDiscount(): number {
    const today = new Date();
    // Assuming we have user's birthday stored somewhere
    const userBirthday = new Date(today.getFullYear(), 5, 15); // Example: June 15
    const is_birthday =
      today.getDate() === userBirthday.getDate() && today.getMonth() === userBirthday.getMonth();
    return is_birthday ? 0.15 : 0;
  }
}

const strategies: { [key: string]: DiscountStrategy } = {
  vip: new VIPDiscount(),
  weekend: new WeekendDiscount(),
  birthday: new BirthdayDiscount(),
};

function getDiscount(userType: string): number {
  const strategy = strategies[userType];
  return strategy ? strategy.getDiscount() : 0;
}
// Example usage:
// console.log(getDiscount("vip")); // 0.2
// console.log(getDiscount("weekend")); // 0.1 or 0
// console.log(getDiscount("birthday")); // 0.15 or 0
