import { Component,OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {Fundraiser} from '../class/Fundraiser';
import {Router} from '@angular/router';
/**
 * @Component decorator to define component metadata
 * @selector Defines the selector for the component
 * @templateUrl Specifies the HTML template file for the component
 * @styleUrl specifies the CSS style file for the component
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // The fundraiser array is used to store data for a fundraiser
  fundraiser:Fundraiser[]=[];
  // isActive and inActive Boolean variables are used to indicate whether the state is active or not, respectively
  isActive:boolean = true;
  inActive:boolean = false;
  /**
   * The constructor injects DataService and Router
   * @param dataService dataService Data service used for HTTP requests
   * @param redirect redirect A routing service used for navigation
   */
  constructor(private dataService:DataService,private redirect:Router) { }
  /**
   * Called during component initialization to get data on all funded projects
   */
  ngOnInit() {
    this.getFundraiser();
  }
  /**
   * Call DataService's getAllFundraisers method to get all fundraisers
   */
  getFundraiser(){
    this.dataService.getAllFundraisers().subscribe(
      (response: Fundraiser[]) => {
        this.fundraiser = response;
        console.log(this.fundraiser);
      }
    )
  }
  /**
   * Call DataService's deleteFundraiserByID method to remove a fundraiser with a specified ID
   * @param id The ID of the fundraising project
   */
  deleteFundraiser(id: number) {
    this.dataService.deleteFundraiserByID(id).subscribe(
      data => {
        alert(data.message);
        window.location.reload();
      }
    )
  }
}


