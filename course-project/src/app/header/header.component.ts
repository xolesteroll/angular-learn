import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() onNavigation = new EventEmitter<string>()

  navigate(navElement: string) {
    this.onNavigation.emit(navElement)
  }
}
