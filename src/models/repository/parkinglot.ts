/* eslint-disable no-console */

import Vehicle from "../vehicle";
import Ticket from "../ticket";

/*
 *Interface ParkingLot
 */
interface ParkingLot<V, T> {
  parkVehicle(vehicle: V): string;
  exitVehicle(ticket: T): V;
  leave(slot: number): string;
  status(): string;
  getLicensePlateFromColor(color: string): string;
}

type TicketOrNull = Ticket | null;
type VehicleOrNull = Vehicle | null;

/*
 *Concrete class
 */
class ParkingLotImpl implements ParkingLot<VehicleOrNull, TicketOrNull> {
  private address: string;

  private vehicles: Array<Vehicle>;

  private maxSize: number;

  private availableSlots: Array<number>;

  constructor(address: string) {
    this.address = address;
    this.vehicles = new Array<Vehicle>();
    this.maxSize = 0;
    this.availableSlots = new Array<number>();
  }

  get Vehicles() {
    return this.vehicles;
  }

  get Address() {
    return this.address;
  }

  get AvailableSlotsCount() {
    return this.availableSlots.length;
  }

  create(numLots: number): number {
    this.maxSize = numLots;

    for (let i = 1; i <= numLots; i++) {
      this.availableSlots.push(i);
    }

    return this.availableSlots.length;
  }

  parkVehicle(vehicle: Vehicle): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (this.maxSize === this.vehicles.length) {
      return `Sorry, parking lot is full`;
    }

    const slot = this.availableSlots[0];
    const ticket = vehicle.parkingVehicle(slot);

    if (ticket == null) {
      return `Vehicle already parked previously`;
    }

    this.vehicles.push(vehicle);
    // console.log("Pushed to vehicles:", vehicle);
    this.availableSlots.shift();

    return `Allocated slot number: ${slot}`;
  }

  exitVehicle(ticket: TicketOrNull): VehicleOrNull {
    // TODO: obsolete. use leave method below.

    // const tkt = ticket;
    // tkt.ExitDate = new Date();

    const target = this.vehicles.find(
      v => typeof v !== "undefined" && v.Ticket?.Id === ticket?.Id
    );
    if (target) {
      const index = this.vehicles.indexOf(target);

      if (index > -1) {
        this.vehicles.splice(index, 1);
      }

      return target;
    }

    return null;
  }

  leave(slot: number): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (slot > this.maxSize) {
      return "Invalid slot number - out of bound";
    }

    if (this.vehicles.length > 0) {
      const target = this.vehicles.find(
        v => typeof v !== "undefined" && v.Slot === slot
      );

      if (target) {
        const index = this.vehicles.indexOf(target);

        if (index > -1) {
          this.vehicles.splice(index, 1);
        }

        // Add a the number back into slot
        this.availableSlots.push(slot);
        this.availableSlots.sort();

        return `Slot number ${slot} is free`;
      }

      // console.log("Vehicle:", this.vehicles);

      return `Slot ${slot} is already empty `;
    }

    return "Parking lot is empty";
  }

  status(): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (this.vehicles.length > 0) {
      console.log("Slot No.\tRegistration No.\tColor");

      this.vehicles.forEach((row: Vehicle) => {
        console.log(`${row.Slot}\t\t${row.LicensePlate}\t\t${row.Color}`);
      });

      return "";
    }

    return "Parking lot is empty";
  }

  getLicensePlateFromColor(color: string): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (this.vehicles.length > 0) {
      const matches = new Array<string>();
      this.vehicles.forEach((row: Vehicle) => {
        if (row.Color === color) {
          matches.push(row.LicensePlate);
        }
      });

      let finalResult = "";
      if (matches.length === 0) {
        return "Not found";
      }

      for (let i = 0; i < matches.length; i++) {
        if (!(i === matches.length - 1)) {
          finalResult += `${matches[i]}, `;
        } else {
          finalResult += matches[i];
        }
      }

      return finalResult;
    }

    return "Not found";
  }
}

export default ParkingLotImpl;
