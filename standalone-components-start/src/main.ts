import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';
import {AppComponent} from "./app/app.component";
import {bootstrapApplication} from "@angular/platform-browser";
import {AnalyticsService} from "./app/shared/analytics.service";

if (environment.production) {
  enableProdMode();
}
bootstrapApplication(AppComponent, {
  providers: [
      // AnalyticsService
  ]
})

// platformBrowserDynamic().bootstrapModule(AppComponent)
//   .catch(err => console.error(err));
