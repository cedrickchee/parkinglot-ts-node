import Ticket from "./ticket";

type TicketOrNull = Ticket | null;

class Vehicle {
  private brand: string;

  private height: number;

  private weight: number;

  private licensePlate: string;

  private color: string;

  private isParked: boolean;

  private ticket?: TicketOrNull;

  private slot?: number;

  constructor(
    licensePlate: string,
    color: string,
    brand: string,
    height: number,
    weight: number
  ) {
    this.brand = brand;
    this.height = height;
    this.weight = weight;
    this.licensePlate = licensePlate;
    this.color = color;

    this.isParked = false;
  }

  parkingVehicle(slot: number): TicketOrNull {
    if (!this.isParked) {
      const newTicket = new Ticket(this.licensePlate);

      this.ticket = newTicket;
      this.isParked = true;
      this.slot = slot;

      return newTicket;
    }

    return null;
  }

  get Brand() {
    return this.brand;
  }

  set Brand(brand: string) {
    this.brand = brand;
  }

  get Height() {
    return this.height;
  }

  set Height(height: number) {
    this.height = height;
  }

  get Weight() {
    return this.weight;
  }

  set Weight(weight: number) {
    this.weight = weight;
  }

  get Color() {
    return this.color;
  }

  set Color(color: string) {
    this.color = color;
  }

  get Ticket() {
    return this.ticket;
  }

  public clearTicket(): void {
    this.ticket = null;
  }

  get Slot() {
    return this.slot;
  }

  get LicensePlate() {
    return this.licensePlate;
  }
}

export default Vehicle;
