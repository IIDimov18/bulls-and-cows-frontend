import { Component } from '@angular/core';
import { LeaderboardService } from './services/leaderboard-service'
import { Leaderboard } from './models/leaderboard.model'
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent {
  public leaderboard!: Leaderboard[]
  constructor(private leaderboardService: LeaderboardService){
    this.leaderboardService.getTop<Leaderboard[]>().subscribe((response: Leaderboard[]) =>{
      if(response){
        this.leaderboard = response
      }})
  }
}
