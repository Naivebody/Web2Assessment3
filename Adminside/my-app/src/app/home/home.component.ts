import { Component,OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Fundraiser} from '../Class/Fundraiser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  fundraiser:Fundraiser[]=[];
  isActive:boolean = true;
  inActive:boolean = false;
  constructor(private dataService:DataService) { }
  ngOnInit() {
    this.getFundraiser();
  }
  getFundraiser(){
    this.dataService.getAllFundraisers().subscribe(
      (response: Fundraiser[]) => {
        this.fundraiser = response;
        console.log(this.fundraiser);
      }
    )
  }
}

