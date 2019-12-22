#!/usr/bin/env node

/* eslint-disable no-console */

import readline from "readline";
// import ParkingLot from "./main";
import ParkingLot from "./models/repository/parkinglot";
import Car from "./models/car";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main(): void {
  // const parkinglot = new ParkingLot();
  // rl.on("line", async (input: string) => {
  //   const args: string[] = input.split(" ");

  //   switch (args[0]) {
  //     case "create_parking_lot":
  //       try {
  //         const result = await parkinglot.create(parseInt(args[1], 10));
  //         console.log(result);
  //       } catch (error) {
  //         console.log(`error occured ==> ${error}`);
  //       }
  //       break;

  //     default:
  //       // TODO: write better message to stdout.
  //       // i.e. "Seems like an issue with command that you typed, please note predefined commands
  //       // are case sensitive and matched as per the description!"
  //       console.log("Invalid command.");
  //   }
  // });

  // New parking lot in Raffles Road
  const parkinglot = new ParkingLot("Raffles Road");

  // New cars
  // const carToyota = new Car("KA-01-HH-1234", "White", "Toyota", 3.5, 1.2, "Test-1");
  // const carFord = new Car("KA-01-BB-0001", "Black", "Ford", 2.5, 1.4, "Test-2");

  // Cars are entering, all tickets are saved
  // const ticketToyota = parkinglot.parkVehicle(carToyota);
  // const ticketFord = parkinglot.parkVehicle(carFord);

  // Cars are exiting
  // const myCarToyota = parkinglot.exitVehicle(ticketToyota);

  rl.on("line", (input: string) => {
    const args: string[] = input.split(" ");

    switch (args[0]) {
      case "create_parking_lot":
        try {
          const result = parkinglot.create(parseInt(args[1].trim(), 10));
          console.log(`Created a parking lot with ${result} slots`);
        } catch (error) {
          console.log(`error occured ==> ${error}`);
        }
        break;

      case "park":
        try {
          const licensePlate = args[1].trim();
          const color = args[2].trim();
          const carToyota = new Car(
            licensePlate,
            color,
            "Toyota",
            3.5,
            1.2,
            "Test-1"
          );
          const result = parkinglot.parkVehicle(carToyota);
          console.log(result);
          // console.log("Available slots:", parkinglot.AvailableSlotsCount);
        } catch (e) {
          console.log(`error occured ==> ${e}`);
        }
        break;

      case "leave":
        try {
          const slot = args[1].trim();
          const result = parkinglot.leave(parseInt(slot, 10));
          console.log(result);
        } catch (e) {
          console.log(`error occured ==> ${e}`);
        }
        break;

      case "status":
        try {
          const result = parkinglot.status();
          console.log(result);
        } catch (e) {
          console.log(`error occured ==> ${e}`);
        }
        break;

      case "registration_numbers_for_cars_with_colour":
        try {
          const color = args[1].trim();
          const result = parkinglot.getLicensePlateFromColor(color);
          console.log(result);
        } catch (e) {
          console.log(`error occured ==> ${e}`);
        }
        break;

      default:
        // TODO: write better message to stdout.
        // i.e. "Seems like an issue with command that you typed, please note predefined commands
        // are case sensitive and matched as per the description!"
        console.log("Invalid command.");
    }
  });
}

main();
