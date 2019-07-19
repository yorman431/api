import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminGuardService } from './admin-guard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';

const adminRoutes: Routes = [
  { path: 'login', component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [
    RouterModule
  ],
  providers: [
    AdminGuardService,
    LoginService
  ]
})
export class AdminRoutingModule { }
