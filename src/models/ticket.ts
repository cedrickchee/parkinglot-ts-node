type DateOrNull = Date | null;

class Ticket {
  private id: string;

  private enterDate: Date;

  private exitDate: DateOrNull;

  constructor(licensePlate: string) {
    this.id = `${licensePlate}-${new Date().getTime().toString()}`;
    this.enterDate = new Date(); // get current date
    this.exitDate = null;
  }

  get Id() {
    return this.id;
  }

  get EnterDate() {
    return this.enterDate;
  }

  set EnterDate(date: Date) {
    this.enterDate = date;
  }

  get ExitDate() {
    return this.exitDate;
  }

  set ExitDate(date: DateOrNull) {
    this.exitDate = date;
  }
}

export default Ticket;
