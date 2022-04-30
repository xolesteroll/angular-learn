import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];
  onlyOdd = false;
  index = 0

  switchNum() {
    this.index++
    if(this.index > this.numbers.length - 1) {
      this.index = 0
    }
  }


}
