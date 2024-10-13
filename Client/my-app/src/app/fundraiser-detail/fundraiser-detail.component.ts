/**
 * It is used to display the details of the fundraising activity and interact with the backend through the dataService class.
 */
import { Component,OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {Fundraiser} from '../class/Fundraiser';
import {Donation} from '../class/Donation';
/**
 * A decorator for a component, which defines the selector, template file, and style file for that component.
 */
@Component({
  selector: 'app-fundraiser-detail',
  templateUrl: './fundraiser-detail.component.html',
  styleUrl: './fundraiser-detail.component.css'
})
/**
 * The component class FundraiserDetailComponent implements the OnInit interface. imgNum is an array of numbers 
 * from 1 to 5 that is used for image display. isActive identifies whether the fundraising activity is active or not. 
 * The dataID is used to store the ID of the fundraiser. Fundraiser and donation are used to store details of fundraisers 
 * and donations, respectively.
 */
export class FundraiserDetailComponent implements OnInit {
  imgNum : number[] =[1,2,3,4,5]
  isActive: boolean = false;
  dataID = 0;
  fundraiser : Fundraiser[]=[];
  donation : Donation[] = [];
 constructor(private dataService: DataService,private router: ActivatedRoute) { }
/**
 * When the component is initialized, the ngOnInit method subscribes to the query parameter of the route, assigns the 
 * value of the info parameter to the dataID, and prints it to the console for debugging. Then call the getFundraiserDetail 
 * and getDonationDetail methods to get the details.
 */
  ngOnInit() {

    this.router.queryParams.subscribe(params => {
    this.dataID = params['info'];
      console.log(this.dataID);//Debug if the ID has caught
    });
    this.getFundraiserDetail();
    this.getDonationDetail();
  }
/**
 * This method calls the getFundraiserByID method of the dataService to get the details of the fundraiser by the campaign 
 * ID and assign a value to the fundraiser. If the fundraiser is active, set isActive to true.
 */
  getFundraiserDetail() {
   this.dataService.getFundraiserByID(this.dataID).subscribe(
     (response: Fundraiser[]) =>{
       this.fundraiser = response;
       if(this.fundraiser[0].active ===1){
         this.isActive = true;
       }
       console.log(Fundraiser,this.fundraiser);
     }
   )
  }
/**
 * Call the getDonationByFundraiserID method of dataService to get the relevant donation information through the fundraiser ID and assign a value to donation.
 */
  getDonationDetail() {
    this.dataService.getDonationByFundraiserID(this.dataID).subscribe(
      (response: Donation[]) =>{
        this.donation = response;
        console.log("Donation",this.donation);
      }
    )
  }

}
