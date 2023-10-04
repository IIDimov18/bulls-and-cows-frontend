import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GameService } from './services/game-service'
import { DatePipe } from '@angular/common';
import { arrayBuffer } from 'stream/consumers';
import { response } from 'express';
import { parse } from 'querystring';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],

})
export class GameComponent implements OnInit {
  browserRefresh: boolean = false;
  private number!: string;
  public cows!:number[];
  public bulls!:number[];
  public guesses!: string[];
  private startedAt: any;
  public error!:boolean;
  

  constructor(
    private gameService:GameService, 
    private cookieService:CookieService
  ){}

  ngOnInit(){
    this.number = (Math.floor(Math.random() * 10000) + 1000).toString();
    while(!this.checkIfNumberIsUnique(this.number) || this.number.length>4){
      this.number = (Math.floor(Math.random() * 10000) + 1000).toString();
    }
    this.error=false;
    this.cows = [];
    this.bulls = [];
    this.guesses = [];
    this.startedAt = new Date();
    console.log(this.number);
  }

  gameForm = new FormGroup({
    // numberOne: new FormControl(),
    // numberTwo: new FormControl(),
    // numberThree: new FormControl(),
    // numberFour: new FormControl(),
    number: new FormControl("0000",  [Validators.max(9999), Validators.min(1000)])
  })

  @HostListener("window:beforeunload", ["$event"]) beforeUnloadHandler(event: Event) {
    console.log("window:beforeunload");
    // event.returnValue = "You will leave this page" as any;
  }

  private checkIfNumberIsUnique(number: string){
    for (let i = 0; i < 4; i++) {
      if(number.split(number[i]).length-1>1){
        return false
      }
    }
    return true;
  }

  public inputChange(event: any){
    console.log(event.target.value)
    if (event.target.value.length > 4) {
      event.target.value = event.target.value.slice(0,4); 
    }
    this.error = !this.checkIfNumberIsUnique(event.target.value.slice(0,4))
  }

  public onSubmit(){
    if(this.gameForm.value.number){
    console.log(this.gameForm.value.number.toString().slice(0,4))

      let guess = this.gameForm.value.number.toString().slice(0,4);
      
      let points = this.checkGuess(guess);

      this.bulls.push(points.bulls);
      this.cows.push(points.cows)
      this.guesses.push(guess);
      if(points.won){
        let now = new Date()
        let params = {
          username: this.cookieService.get("us"),
          guesses: this.guesses.length,
          timeInSeconds: (now.getTime()-this.startedAt.getTime())/1000
        }
        console.log(params);
        // this.gameService.finishGame(params);
        this.gameService.finishGame<boolean>(params).subscribe((response: boolean) =>{
        })
        alert("Congratulations you won. You will be redirected shortly");
        // setTimeout(() => {
        //   window.location.href = '/'
        // }, 2500);
      }
    }
  }

  checkGuess(guess:string){
    let response ={
      cows: 0,
      bulls: 0,
      won: false
    }

    if(this.number==guess){
      response.won =true;
      return response
    }
    
    for (let i = 0; i < 4; i++) {
      if(this.number[i]==guess[i]){
        response.bulls++;
      }else if(this.number.indexOf(guess[i])!=-1){
        response.cows++;
      }
    }
    return response;
  }
}
