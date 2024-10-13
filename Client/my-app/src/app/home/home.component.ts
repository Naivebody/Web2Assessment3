import { Component ,OnInit} from '@angular/core';
import {Fundraiser} from '../class/Fundraiser';
import {DataService} from '../data.service';
/**
 * A decorator for a component, which defines the selector, template file, and style file for that component.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
/**
 * The component class HomeComponent implements the OnInit interface. imgNum is an array of numbers from 1 to 5 
 * that is used for image display. Fundraiser is used to store an array of fundraisers. DataService is a service 
 * passed in via dependency injection to interact with background data.
 */
export class HomeComponent implements OnInit {
  imgNum : number[] =[1,2,3,4,5]
  fundraiser : Fundraiser[] = [];

  //Inject the data service
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getHomeDatalist();
  }

  /**
   * Invoke the GET request method for data display
   */
  getHomeDatalist(){
    this.dataService.getAllFundraisers().subscribe(
      (response: Fundraiser[]) => {
        this.fundraiser = response;
        console.log(this.fundraiser);
      }

    )

  }
}
