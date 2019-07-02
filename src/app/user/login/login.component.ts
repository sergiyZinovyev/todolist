import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  lang = this.auth.curentLang;
  errorMessage: boolean = false;
  getSpinner: boolean = false;
  

  constructor(
    private auth: AuthService,
    public info: AuthService,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit() {
    this.auth.lang.subscribe({
      next: (value: string) => {
        this.lang = value;
      }
    })
  }

  login() {
    if(this.loginForm.valid){
      this.auth.loginUser(this.loginForm.value);
      this.errorMessage = true;
      this.getSpinner = true;
      //console.log(this.auth.errorMessage)
      
    } 
  }

}
