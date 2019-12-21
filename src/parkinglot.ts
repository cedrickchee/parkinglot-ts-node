class ParkingLot {
  public car: any[];

  public maxSize: number;

  public availableSlot: number[];

  constructor() {
    this.car = [];
    this.maxSize = 0;
    this.availableSlot = [];
  }

  async create(noOfLot: number) {
    try {
      this.maxSize = noOfLot;
    } catch (e) {
      return "Parameter is not a number!";
    }

    for (let i = 1; i <= this.maxSize; i++) {
      this.availableSlot.push(i);
    }

    return `Created a parking lot with ${this.availableSlot.length} slots`;
  }
}

export default ParkingLot;
