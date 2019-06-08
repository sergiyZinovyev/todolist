import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit() {
  }

  login() {
    this.auth.loginUser(this.loginForm.value);
  }
}
