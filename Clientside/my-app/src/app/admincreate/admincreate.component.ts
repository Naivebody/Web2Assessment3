//Users can create fundraising projects through this component.
import { Component ,OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Category} from '../class/Category';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admincreate',
  templateUrl: './admincreate.component.html',
  styleUrl: './admincreate.component.css'
})
export class AdmincreateComponent implements OnInit {
  // Stores arrays of all classes
  categories: Category[]=[];
  // Boolean variable indicating whether it is active or not
  isActive:boolean = false;
  // A numerical variable representing an active state
  active:number = 0;
  /**
   * Constructor injects DataService and Router
   * @param dataService Data service for HTTP requests
   * @param redirect Routing service used for navigation
   */
  constructor(private dataService: DataService,private redirect: Router) {
  }
  /**
   * Called during component initialization to get data for all categories
   */
  ngOnInit() {
    this.getCategory();
  }
  /**
   * Handles form submission events, performs data validation, and sends data to the server
   * @param form Form object
   * @returns
   */
  onSave(form: NgForm) {
    const target = form.value.TARGET_FUNDING;
    const city = form.value.CITY;
    const organizer = form.value.ORGANIZER;
    // Check if target is over 5
    if (!/^([5-9]|[1-9]\d+)$/.test(target)) {
      alert("Minimum target fund should be higher than minimum donation amount!");
      return;
    }

    // Check if city only contain letters
    if (!/^[A-Za-z\s]+$/.test(city)) {
      alert("City can only contain space and letters.");
      return;
    }

    // Check if organizer is yyyy-mm-dd
    if (!/^[A-Za-z\s]+$/.test(organizer)) {
      alert("Organizer can only contain space and letters.");
      return;
    }
    if(this.isActive){
      this.active=1;
    }
    form.value.ACTIVE=this.active;
    //The data submitted by the form is processed and sent to the server
    if (form.valid) {
      console.log('Form Data:', form.value);
      this.dataService.postFundraisertoDB(form.value).subscribe(
        data => {
          alert(data.message+' ID:'+data.id);
          this.redirect.navigate(['/adminhome']);
        }
      )
    }
  }
  /**
   * Gets data for all categories and assigns it to the Categories array
   */
  getCategory(){
    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      }
    )
  }
}
