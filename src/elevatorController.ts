import { Elevator } from "./elevator";
import { Request } from "./request";

export class ElevatorController {
  private elevators: Elevator[];

  constructor(numElev: number, capacity: number) {
    this.elevators = new Array();
    for (let i = 0; i < numElev; i++) {
      const elev = new Elevator(i + 1, capacity);
      this.elevators.push(elev);
      elev.run();
    }
  }

  requestElevator(sourceFloor: number, destinationFloor: number) {
    const optimalElevator: Elevator = this.findOptimalElevator(
      sourceFloor
      // destinationFloor
    );
    optimalElevator.addRequest(new Request(sourceFloor, destinationFloor));
  }

  findOptimalElevator(
    sourceFloor: number,
    destinationFloor?: number
  ): Elevator {
    let optimal = null;
    let minDistance = Infinity;

    for (let i = 0; i < this.elevators.length; i++) {
      const distance = Math.abs(
        sourceFloor - this.elevators[i].getCurrentFloor()
      );
      if (distance < minDistance) {
        minDistance = distance;
        optimal = this.elevators[i];
      }
    }
    return optimal!;
  }
}
