import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navLink: string = 'recipes'

  onNavigationFired(navElement: string) {
    this.navLink = navElement
  }
}
