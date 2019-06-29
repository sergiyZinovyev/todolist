import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-firebase';
  panelOpenState = false;
  
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
   //this.router.navigate(['/home']);
   //console.log('test');
 }

}
