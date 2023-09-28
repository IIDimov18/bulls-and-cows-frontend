import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],

})
export class GameComponent {
  browserRefresh: boolean =false;
  number!: string;

  gameForm = new FormGroup({
    numberOne: new FormControl(),
    numberTwo: new FormControl(),
    numberThree: new FormControl(),
    numberFour: new FormControl(),
  })

  @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
    console.log("window:beforeunload");
    // event.returnValue = "You will leave this page" as any;
  }

  public inputChange(event: any){
    console.log(event)
    console.log(event.target.value)
    event.target.value = event.data
    console.log(event.target.value)

    console.log(this.gameForm.value)
  }

  public onSubmit(){
    console.log(this.gameForm.value)
  }
}
