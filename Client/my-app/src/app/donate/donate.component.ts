/**
 * Receives the fundraiser ID in the routing parameters and handles the submission of the donation form to
 * interact with the database.
 */
import { Component,OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute,Router} from '@angular/router';
import {Fundraiser} from '../class/Fundraiser';
/**
 * A decorator for a component, which defines the selector, template file, and style file for that component.
 */
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
/*
 * The HomeComponent implements the OnInit interface. imgNum is an array of numbers from 1 to 5 that is used for
 * image display. Fundraiser is used to store an array of fundraisers. DataService is a service passed in via dependency
 * injection to interact with background data.
 */
export class DonateComponent implements OnInit {
  fundraiser : Fundraiser[] = [];
  fundraiserID:number = 0;
  isActive: boolean = false;
  constructor(private dataService: DataService,private router: ActivatedRoute,private redirect: Router) { }
/**
 * During initialization, the ngOnInit method will call the getHomeDatalist method to retrieve data.
 */
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.fundraiserID = params['info'];
      console.log(this.fundraiserID);//Debug if the ID has caught
    });
    this.getFundraiser();
  }


/**
 * Call the dataService's getAllFundraisers method to retrieve all fundraising campaign data from the server
 * and assign it to the fundraiser array. Successfully, print the data to the console.
 * @param form
 */
  onSubmit(form: NgForm) {
  const amount = form.value.AMOUNT;
  const giver = form.value.GIVER;
  const date = form.value.DATE;
  // Check if amount is over 5
  if (!/^([5-9]|[1-9]\d+)$/.test(amount)) {
    alert("Minimum donation is 5 AUD!");
    return;
  }

  // Check if giver only contain letters
  if (!/^[A-Za-z\s]+$/.test(giver)) {
    alert("Giver can only contain space and letters.");
    return;
  }

  // Check if date is yyyy-mm-dd
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    alert("Date format should be YYYY-MM-DD");
    return;
  }

  //The data submitted by the form is processed and sent to the server
  if (form.valid) {
      console.log('Form Data:', form.value);
      this.dataService.postDonationtoDB(form.value).subscribe(
        data => {
          alert(data.message+this.fundraiser[0].organizer);
          this.redirect.navigate(['/fundraiser'],{queryParams:{info:this.fundraiserID}});
        }
      )
    }
  }
  /**
   * Get the details of a specific fundraising project from the server.
   */
  getFundraiser(){
    this.dataService.getFundraiserByID(this.fundraiserID).subscribe(
      (response: Fundraiser[]) =>{
        this.fundraiser = response;
        if(this.fundraiser[0].active ===1){
          this.isActive = true;
        }
      }
    )
  }

}
