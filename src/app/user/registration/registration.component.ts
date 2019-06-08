import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private fb: FormBuilder
  ) { }

  regForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  ngOnInit() {
    
  }

  registration() {
    console.log(this.regForm.value);
    this.auth.registrationUser(this.regForm.value);
  }

}
