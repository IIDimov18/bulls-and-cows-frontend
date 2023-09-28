import { Component, OnInit } from '@angular/core';
import { registerParams, registerResponse } from '../../models/register.model';
import { RegisterService } from '../../services/register-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loginResponse } from '../../models/login.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  submitted = false;

  error!: string;

  response!: loginResponse;

  constructor(private formBuilder: FormBuilder, private registerService:RegisterService, private cookieService:CookieService){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  get validate() { return this.registerForm.controls; }

  public onSubmit(){
    const confirmPassword = this.registerForm.value.confirmPassword;
    const password = this.registerForm.value.password;

    this.submitted = true;
    if (this.registerForm.invalid && confirmPassword!=password) {
      return;
    }
    const params:registerParams = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }
    console.log(params)
    this.registerService.Register<registerResponse>(params).subscribe((response: registerResponse) =>{
      if(response.error){
        this.error = response.error;
      }
      console.log(response)
    },(error) => {
      console.log(error)
    })
  }
}
