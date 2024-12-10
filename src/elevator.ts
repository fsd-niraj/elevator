import { Direction } from "./direction";
import { Request } from "./request";

export class Elevator {
  private readonly id: number;
  private readonly capacity: number;
  private currentFloor: number;
  private currentDirection: Direction;
  private readonly requests: Request[];
  private readonly resolveQue: ((value: Request) => void)[] = [];

  constructor(id: number, capacity: number) {
    this.id = id;
    this.capacity = capacity;
    this.currentFloor = 1;
    this.currentDirection = Direction.UP;
    this.requests = new Array<Request>();
  }

  async addRequest(request: Request) {
    if (this.resolveQue.length > 0) {
      const resolve = this.resolveQue.shift();
      if (resolve) resolve(request);
    } else {
      this.requests.push(request);
    }
  }

  async getNextRequest() {
    if (this.requests.length > 0) {
      return Promise.resolve(this.requests.shift()!);
    }

    return new Promise<Request>((res) => {
      this.resolveQue.push(res);
    });
  }

  async processRequests() {
    while (this.requests.length > 0) {
      const req: Request = await this.getNextRequest();
      this.processReq(req);
    }
  }

  async processReq(req: Request) {
    const startFloor = this.currentFloor;
    const endFloor = req.getDestinationFloor();

    if (startFloor < endFloor) {
      this.currentDirection = Direction.UP;
      for (let i = startFloor; i <= endFloor; i++) {
        this.currentFloor = i;
        console.log(`Elevator ${this.id} is at ${this.currentFloor}`);
        try {
          setTimeout(() => {}, 1000);
        } catch (error: any) {
          throw new Error(error);
        }
      }
    } else if (startFloor > endFloor) {
      this.currentDirection = Direction.DOWN;
      for (let i = startFloor; i >= endFloor; i--) {
        this.currentFloor = i;
        console.log(`Elevator ${this.id} is at ${this.currentFloor}`);
        try {
          setTimeout(() => {}, 1000);
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
  }

  run(): void {
    this.processRequests();
  }

  getCurrentFloor(): number {
    return this.currentFloor;
  }
}
