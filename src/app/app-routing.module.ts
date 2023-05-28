import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { ClientsComponent } from './components/clients/clients.component';
import { AgentInfosComponent } from './components/agent-infos/agent-infos.component';
import { AuthGuard } from './auth-guard.guard';
import { DemandsComponent } from './components/demands/demands.component';
import { ChangePwdComponent } from './components/change-pwd/change-pwd.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: '', canActivate: [AuthGuard], children: [
      {
        path: 'navigation', component: NavigationComponent, children: [
          {
            path: '', component: HomeComponent
          },
          {
            path: 'clients', component: ClientsComponent
          },
          {
            path: 'infos', component: AgentInfosComponent
          },
          {
            path:'demands', component:DemandsComponent
          },
          {
            path:'change-pwd', component:ChangePwdComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
