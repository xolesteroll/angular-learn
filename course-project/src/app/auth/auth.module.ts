import {NgModule} from "@angular/core";
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthComponent
      }
    ]),
  ],
  exports: [
    AuthComponent,
  ]
})
export class AuthModule {

}
