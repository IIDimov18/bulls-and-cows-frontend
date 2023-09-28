import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './authentication/authentication.component';

import { RegisterComponent } from './authentication/components/register/register.component';
import { LoginComponent } from './authentication/components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuccesfulRegisterComponent } from './authentication/components/succesful-register/succesful-register.component';
import { GameComponent } from './game/game.component';
import { MainComponent } from './main/main.component';




@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent,
    SuccesfulRegisterComponent,
    GameComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
