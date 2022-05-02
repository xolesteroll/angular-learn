import {Injectable} from "@angular/core";
import {CounterService} from "./counter.service";

@Injectable()
export class UsersService {
  users = {
    activeUsers: ['Max', 'Anna'],
    inactiveUsers: ['Chris', 'Manu']
  }

  constructor(private counterService: CounterService) {
  }

  setToInactive(id: number) {
    this.users.inactiveUsers.push(this.users.activeUsers[id]);
    this.users.activeUsers.splice(id, 1);
    this.counterService.addActiveToInactive()
  }

  setToActive(id: number) {
    this.users.activeUsers.push(this.users.inactiveUsers[id]);
    this.users.inactiveUsers.splice(id, 1);
    this.counterService.addInactiveToActive()
  }

}
