# Parking Lot Algorithm

This project describes and solves the parking lot problem using TypeScript and Object-Oriented Programming pattern.

## The problem

Design an Object-Oriented parking lot using any programming language features.

## The Solution

### Model

We're going to implement a generic parking lot ticketing system, using the following classes and interfaces:

- Ticket
- Vehicle, Car
- Parking Lot

### Ticket

The **Ticket** class is used by **Vehicle** class: it describes the associations between the parked Vehicle and the entering ticket. It defines an _id_, _entry_ and _exit Date_. The _id_ is calculated using the combination between current time and license plate of car.

```txt

-------------------------
|        Ticket         |
|-----------------------|
| + id: string          |
| + enterDate: DateTime |
| + exitDate: DateTime  |
-------------------------

```

### Vehicle

The **Vehicle** class contains some attributes about Vehicle _dimensions_, and _brand_ and the _license plate_. It also contains the methods to park/exit the Vehicles from Parking lot.

The **Car** extends Vehicle class, and it adds additional information: _is electric car_. The Vehicle class can be eventually extended to add other vehicle types.

```txt

    -----------------------------
    |          Vehicle          |
    |---------------------------|
    | + color: string           |
    | + brand: string           |
    | + height: number          |
    | + weight: number          |
    | + ticket: Ticket          |
    | + isParked: boolean       |
    |---------------------------|
    | + Vehicle(): void         |
    | + parkVehicle(): Ticket   |
    | + leaveVehicle(): Vehicle |
    -----------------------------
                 ^
                 |
              Extends
                 |
------------------------------------
|                Car               |
|----------------------------------|
| + licensePlate: string           |
| + isElectricCar: boolean         |
|----------------------------------|
| + constructor(class_param): void |
------------------------------------

```

### Parking Lot

The **Parking lot** is described using a combination between an interface and a class: the interface contains functions signatures, and the concrete class contains an array that is used as a Vehicles container.

```txt

      --------------------------------
      |         <<interface>>        |
      |       ParkingLot<V, T>       |
      |------------------------------|
      | + parkVehicle(vehicle: V): T |
      | + leaveVehicle(ticket: T): V |
      --------------------------------
                    ^
                    |
                 Extends
                    |
-------------------------------------------
|             ParkingLotImpl              |
|-----------------------------------------|
| + address: string                       |
| + maxSize: number                       |
| + availableSlots: array                 |
|-----------------------------------------|
| + parkVehicle(vehicle: Vehicle): Ticket |
| + leaveVehicle(ticket: Ticket): Vehicle |
-------------------------------------------

```

## How to Use this Project

- Install all dependencies:

```sh
$ git clone {repo url}
$ cd parkinglot-ts-node
$ npm install
```

- Build binary:

```sh
$ npm build
$ npm link
```

- Run the main program:
  For interactive mode:

```sh
$ parkinglot
```

For file mode:
_TODO_

```sh
$ parkinglot ./data/inputs.txt
```

- Run tests cases:

```sh
$ npm test test/run.testcases.js
```

**Test Inputs:**

For interactive mode.

```sh
create_parking_lot 6
park KA-01-HH-1234 White
park KA-01-HH-9999 White
park KA-01-BB-0001 Black
park KA-01-HH-7777 Red
park KA-01-HH-2701 Blue
park KA-01-HH-3141 Black
leave 4
status
park KA-01-P-333 White
park DL-12-AA-9999 White
registration_numbers_for_cars_with_colour White
slot_numbers_for_cars_with_colour White
slot_number_for_registration_number KA-01-HH-3141
slot_number_for_registration_number MH-04-AY-1111
```

**Test Outputs:**

```sh
Created a parking lot with 6 slots
Allocated slot number: 1
Allocated slot number: 2
Allocated slot number: 3
Allocated slot number: 4
Allocated slot number: 5
Allocated slot number: 6
Slot number 4 is free
Slot No.    Registration No     Colour
1           KA-01-HH-1234       White
2           KA-01-HH-9999       White
3           KA-01-BB-0001       Black
5           KA-01-HH-2701       Blue
6           KA-01-HH-3141       Black
Allocated slot number: 4
Sorry, parking lot is full
KA-01-HH-1234, KA-01-HH-9999, KA-01-P-333
1, 2, 4
6
Not found
```
