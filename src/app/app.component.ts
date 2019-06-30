import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  langMenu: string = 'en';
  Dashboard = "Dashboard";
  Login = "Login";
  Registration = "Registration";
  Logout = "Logout";
  en = "en";
  ukr = "ukr";

  panelOpenState = false;
  lang = this.auth.curentLang;
  
  ngOnInit() {
    this.auth.lang.subscribe({
      next: (value: string) => {
        this.lang = value;
      }
    })
    
  }

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

 logout(){
  this.auth.logout()
 }

 myUser(){
  return this.auth.user
 }

 myLang(lang){
   this.auth.getLang(lang);
 }

}
