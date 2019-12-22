import Vehicle from "./vehicle";

class Car extends Vehicle {
  private isElectric: boolean;

  constructor(
    licensePlate: string,
    color: string,
    brand: string,
    height: number,
    weight: number,
    isElectric: boolean
  ) {
    super(licensePlate, color, brand, height, weight);
    this.isElectric = isElectric;
  }

  get IsElectric() {
    return this.isElectric;
  }

  set IsElectric(isElectric: boolean) {
    this.isElectric = isElectric;
  }
}

export default Car;
