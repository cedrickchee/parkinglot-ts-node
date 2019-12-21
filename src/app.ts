/* eslint-disable no-console */

import readline from "readline";
import ParkingLot from "./parkinglot";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main(): void {
  const p = new ParkingLot();
  rl.on("line", async input => {
    const inp = input.split(" ");

    switch (inp[0]) {
      case "create_parking_lot":
        try {
          const result = await p.create(parseInt(inp[1], 10));
          console.log(result);
        } catch (error) {
          console.log(`error occured ==> ${error}`);
        }
        break;

      default:
        console.log(
          "Seems like an issue with command that you typed, please note predefined commands are case sensitive and matched as per the description!"
        );
    }
  });
}

main();
