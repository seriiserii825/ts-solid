export default function abstractionGetDate() {
  interface IDate {
    getCurrentYear(): number;
    getCurrentMonth(): number;
    getCurrentDate(): number;
  }

  class CustomDate implements IDate {
    constructor(private date: Date) {
      this.date = date;
    }

    getCurrentYear(): number {
      return this.date.getFullYear();
    }

    getCurrentMonth(): number {
      return this.date.getMonth();
    }

    getCurrentDate(): number {
      return this.date.getDate();
    }
  }

  const my_date: CustomDate = new CustomDate(new Date());
  console.log(my_date.getCurrentYear());
}
