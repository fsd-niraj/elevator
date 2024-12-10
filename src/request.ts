export class Request {
  private readonly sourceFloor: number;
  private readonly destinationFloor: number;

  constructor(sourceFloor: number, destinationFloor: number) {
    this.sourceFloor = sourceFloor;
    this.destinationFloor = destinationFloor;
  }

  getSourceFloor(): number {
    return this.sourceFloor;
  }

  getDestinationFloor(): number {
    return this.destinationFloor;
  }
}
