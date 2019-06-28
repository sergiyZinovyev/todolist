import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goLogin(){
    this.router.navigate(['user/login']);
  }

  goRegistration(){
    this.router.navigate(['user/registration']);
  }
}
