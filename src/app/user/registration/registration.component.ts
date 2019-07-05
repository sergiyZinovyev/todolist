import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, FormGroup, AbstractControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

function passwordConfirming(c: AbstractControl): any {
  if(!c.parent || !c) return;
  const pwd = c.parent.get('password');
  const cpwd = c.parent.get('confirmPassword');

  if(!pwd || !cpwd) return ;
  if (pwd.value !== cpwd.value) {
      return { invalid: true };
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  lang = this.auth.curentLang;
  errorMessage: boolean = false;
  getSpinner: boolean = false;

  constructor(
    private auth: AuthService,
    public info: AuthService,
    private fb: FormBuilder
  ) { }

  regForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$")]),
    confirmPassword: new FormControl('', [Validators.required, passwordConfirming]),
    //recaptchaReactive: new FormControl(null, Validators.required)
  })

  ngOnInit() {
    this.auth.lang.subscribe({
      next: (value: string) => {
        this.lang = value;
      }
    })
    this.regForm.controls['password'].valueChanges.subscribe((value) => this.regForm.controls['confirmPassword'].setValue('')) 
  }

  registration() {
    if(this.regForm.valid){
      this.getSpinner = true;
      this.auth.registrationUser(this.regForm.value);
      this.errorMessage = true;
      //console.log(this.auth.errorMessage)
    }
    
  }

}
