import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  constructor(private route: ActivatedRoute){}

  public url:string = '';

  ngOnInit(): void {
    // Get the current URL segment
    this.url = this.route.snapshot.url[0].path;
  }
}