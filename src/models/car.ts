import Vehicle from "./vehicle";

class Car extends Vehicle {
  private carInsurance: string;

  constructor(
    licensePlate: string,
    color: string,
    brand: string,
    height: number,
    weight: number,
    carInsurance: string
  ) {
    super(licensePlate, color, brand, height, weight);
    this.carInsurance = carInsurance;
  }

  get CarInsurance() {
    return this.carInsurance;
  }

  set CarInsurance(carInsurance: string) {
    this.carInsurance = carInsurance;
  }
}

export default Car;
