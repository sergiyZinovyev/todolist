import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { FormBuilder, Validators, FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  lang = this.auth.curentLang;
  matcher = new MyErrorStateMatcher();
  
  //errorMessage = this.auth.errorMessage;
  errorMessage = 'errorMessage';

  constructor(
    public auth: AuthService,
    private fb: FormBuilder
  ) { }

  regForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit() {
    this.auth.lang.subscribe({
      next: (value: string) => {
        this.lang = value;
      }
    })
    //this.errorMessage = ''
  }

  registration() {
    console.log(this.regForm.value);
    if(this.regForm.valid){
      this.auth.registrationUser(this.regForm.value);
      this.errorMessage = this.auth.errorMessage;
      console.log(this.auth.errorMessage)
    }
    
  }

}
