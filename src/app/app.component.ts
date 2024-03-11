import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/login/login.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'reto-portal-proveedores';
  user?: User | null;

  constructor(private router: Router, private loginService: LoginService){
    this.loginService.user.subscribe(x => this.user = x);
  }

  ngOnInit(){
    //this.user = this.loginService.userValue;

  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }

  logOut(){
    this.loginService.logout();
  }
}
