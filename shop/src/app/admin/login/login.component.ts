import { Component } from '@angular/core';

import { LoginService } from './login.service';
import { Users } from './users';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

title = 'Login Admin';
errorMessage: string;
user: Users = {
  username: '',
  password: '',
  role: '',
  status: true
}

constructor( private _loginService: LoginService, private router: Router) { }

checkUser() {
  return this._loginService.checkUser(this.user)
    .subscribe(user => {
      if (this._loginService.isLogged) {
        const redirect = this._loginService.redirectUrl ? this._loginService.redirectUrl : '/admin';
        console.log(this._loginService.isLogged);
        this.router.navigate([redirect]);
      }
    },
    error => this.errorMessage = <any>error
    );
}

logOut() {
  this._loginService.logOut();
  this.router.navigate(['/login']);
}

}
