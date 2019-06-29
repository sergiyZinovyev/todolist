import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  lang = this.auth.lang;

  homeHead: string = 'Achieve the unattainable!';
  homeContent1: string = 'Set unachievable goals and achieve them. Create an unlimited number of task lists and manage them all at the same time';
  signIn = 'Sign in';
  signUp = 'Sign up';

  constructor(
    private router: Router,
    private auth: AuthService,
    ) { }
  
  ngOnInit() {
    console.log(this.lang)
  }

  goLogin(){
    this.router.navigate(['user/login']);
  }

  goRegistration(){
    this.router.navigate(['user/registration']);
  }
}
