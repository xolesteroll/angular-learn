import {Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./users/user/user.component";
import {ServersComponent} from "./servers/servers.component";
import {EditServerComponent} from "./servers/edit-server/edit-server.component";
import {ServerComponent} from "./servers/server/server.component";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent,
    children: [
      {
        path: ':id/:name',
        component: UserComponent
      }
    ]
  },
  {
    path: 'servers',
    component: ServersComponent,
    children: [
      {
        path: ':id',
        component: ServerComponent
      },
      {
        path: ':id/edit',
        component: EditServerComponent
      }
    ]
  }
]

export default appRoutes
