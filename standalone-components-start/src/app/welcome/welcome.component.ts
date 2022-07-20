import { Component } from '@angular/core';
import {DetailsComponent} from "./details/details.component";
import {HighlightDirective} from "../shared/highlight.directive";

@Component({
  standalone: true,
  imports: [HighlightDirective, DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {}
