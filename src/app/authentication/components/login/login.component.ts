import { Component, OnInit } from '@angular/core';
import { loginParams } from '../../models/login.model';
import { LoginService } from '../../services/login-service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { loginResponse } from '../../models/login.model';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  submitted = false;

  error!: string;

  response!: loginResponse;

  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private cookieService:CookieService){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  get validate() {  return this.loginForm.controls; }

  public onSubmit(){

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    const params:loginParams = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe
    }
    console.log(params)
    this.loginService.Login<loginResponse>(params).subscribe((response: loginResponse) =>{
      if(response.error){
        this.error = response.error;
      }else{
        console.log("logged")
        if(response.token){
          this.cookieService.set("tok",response.token);
        }
        this.cookieService.set("us",response.username)
      }
      console.log(response)
    },(error) => {
      console.log(error)
    })
  }
}
