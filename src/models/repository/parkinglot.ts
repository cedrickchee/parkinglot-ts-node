/* eslint-disable no-console */

import Vehicle from "../vehicle";
import Ticket from "../ticket";

/*
 * Interface ParkingLot
 */
interface ParkingLot<V, T> {
  create(numLots: number): number;
  park(vehicle: V): string;
  leave(slot: number): string;
  status(): string;
  getLicensePlateFromColor(color: string): string;
  getSlotNumbersFromColor(color: string): string;
  getSlotNumberFromLicensePlate(licensePlate: string): string;
}

type TicketOrNull = Ticket | null;
type VehicleOrNull = Vehicle | null;

/*
 * Concrete ParkingLot class
 *
 * @class ParkingLotImpl
 */
class ParkingLotImpl implements ParkingLot<VehicleOrNull, TicketOrNull> {
  private address: string;

  private vehicles: Array<Vehicle>;

  private maxSize: number;

  private availableSlots: Array<number>;

  /**
   * Creates an instance of ParkingLotImpl.
   *
   * @param address the parking lot location
   */
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

  /**
   * Creates the parking spaces.
   *
   * @param numLots bound parameter for the parking slot array
   */
  create(numLots: number): number {
    this.maxSize = numLots;

    for (let i = 1; i <= numLots; i++) {
      this.availableSlots.push(i);
    }

    return this.availableSlots.length;
  }

  /**
   * Parks a vehicle to the first available slot.
   *
   * @param vehicle the parking space should accept different vehicle type, namely, motorcycle, car, bus.
   */
  park(vehicle: Vehicle): string {
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

  /**
   * Remove the vehicle from parking lot.
   *
   * @param slot parking slot number
   */
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

  /**
   * Gets the current status for the parking lot.
   */
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

  /**
   * Get registration numbers of all vehicles of a particular colour
   *
   * @param color vehicle color
   */
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

  /**
   * Get slot numbers of all slots where a vehicle of a particular colour is parked
   *
   * @param color vehicle color
   */
  getSlotNumbersFromColor(color: string): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (this.vehicles.length > 0) {
      const matches = new Array<number>();
      this.vehicles.forEach((row: Vehicle) => {
        if (row.Color === color && row.Slot) {
          matches.push(row.Slot);
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

  /**
   * Get slot number in which a vehicle with a given registration number is parked
   *
   * @param licensePlate vehicle registration number
   */
  getSlotNumberFromLicensePlate(licensePlate: string): string {
    if (this.maxSize === 0) {
      return "Parking lot is not created";
    }

    if (this.vehicles.length > 0) {
      let matches;
      this.vehicles.forEach((row: Vehicle) => {
        if (row.LicensePlate === licensePlate && row.Slot) {
          matches = row.Slot;
        }
      });

      if (matches === undefined) {
        return "Not found";
      }

      return matches;
    }

    return "Not found";
  }
}

export default ParkingLotImpl;
