import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { MainComponent } from './main/main.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'sign-up', component: AuthenticationComponent},
  { path: 'login', component: AuthenticationComponent },
  { path: 'succesful-registration', component: AuthenticationComponent},
  { path: 'game' , component: GameComponent},

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
