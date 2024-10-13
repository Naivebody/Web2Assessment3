/**
 * Receives the fundraiser ID in the routing parameters and handles the submission of the donation form to 
 * interact with the database.
 */
import { Component,OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
/**
 * A decorator for a component, which defines the selector, template file, and style file for that component.
 */
@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
/**
 * The HomeComponent implements the OnInit interface. imgNum is an array of numbers from 1 to 5 that is used for 
 * image display. Fundraiser is used to store an array of fundraisers. DataService is a service passed in via dependency 
 * injection to interact with background data.
 */
export class DonateComponent implements OnInit {
  fundraiserID:number = 0;
  constructor(private dataService: DataService,private router: ActivatedRoute) {}
/**
 * During initialization, the ngOnInit method will call the getHomeDatalist method to retrieve data.
 */
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.fundraiserID = params['info'];
      console.log(this.fundraiserID);//Debug if the ID has caught
    });
  }
/**
 * Call the dataService's getAllFundraisers method to retrieve all fundraising campaign data from the server 
 * and assign it to the fundraiser array. Successfully, print the data to the console.
 * @param form 
 */
  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Data:', form.value);
      this.dataService.postDonationtoDB(form.value).subscribe(
        data => {
          alert(data.message+", ID:"+data.id);
        }
      )
    }
  }

}
