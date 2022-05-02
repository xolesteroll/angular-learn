import {Injectable} from "@angular/core";

@Injectable()
export class CounterService {
  activeToInactiveCounter: number = 0
  inactiveToActiveCounter: number = 0

  addActiveToInactive() {
    this.activeToInactiveCounter++
    console.log(this.activeToInactiveCounter)
  }

  addInactiveToActive() {
    this.inactiveToActiveCounter++
    console.log(this.inactiveToActiveCounter)
  }
}
