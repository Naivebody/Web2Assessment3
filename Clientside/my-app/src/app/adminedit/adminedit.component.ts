import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../class/Category';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Fundraiser} from '../class/Fundraiser';
/**
 * @Component The decorator defines component metadata
 * @selector Defines the selector for the component
 * @templateUrl Specifies the HTML template file for the component
 * @styleUrl specifies the CSS style file for the component
 */
@Component({
  selector: 'app-adminedit',
  templateUrl: './adminedit.component.html',
  styleUrl: './adminedit.component.css'
})
export class AdmineditComponent implements OnInit {
  // Use @ViewChild to get the form reference in the template
  @ViewChild('editForm') editForm!: NgForm
  //The ID of the fundraising project
  fundraiserID:number =0;
  //Used to store data for fundraising projects
  fundraiser:Fundraiser[]=[];
  //Used to store all categories of data
  categories: Category[]=[];
  // Boolean variable indicating whether it is active or not
  isActive:boolean = false;
  //A numeric variable representing the active state
  active:number = 0;
  /**
   * The constructor injects DataService, Router, and ActivatedRoute
   * @param dataService dataService Data service used for HTTP requests
   * @param redirect redirect A routing service used for navigation
   * @param router router Indicates the service used to obtain route parameters
   */
  constructor(private dataService: DataService,private redirect: Router,private router: ActivatedRoute) {
  }
  /**
   * Initializes the form data
   */
  initializeFormData(): void {
    const initialData = {
      ORGANIZER: this.fundraiser[0].organizer,
      CATEGORY_ID: this.fundraiser[0].categoryID,
      CITY: this.fundraiser[0].city,
      TARGET_FUNDING: this.fundraiser[0].target_funding,
      CURRENT_FUNDING: this.fundraiser[0].current_funding,
      ACTIVE: this.fundraiser[0].active === 1,
      CAPTION: this.fundraiser[0].caption,
    };
    this.editForm.setValue(initialData);
    console.log(this.editForm.value)
  }
  /**
   * Called during component initialization to get routing parameters and data for all categories and funded items
   */
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.fundraiserID = params['info'];
      console.log(this.fundraiserID);//Debug if the ID has caught
    });
    this.getCategory();
    this.getFundraiser();

  }
  /**
   * Handles form submission events, performs data validation, and sends data to the server
   * @param form
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
      this.dataService.putFundraisertoDB(this.fundraiserID,form.value).subscribe(
        data => {
          alert(data.message);
          this.redirect.navigate(['/home']);
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
  /**
   * Gets the data for the fundraising project and initializes the form
   */
  getFundraiser(){
    this.dataService.getFundraiserByID(this.fundraiserID).subscribe(
      (response: Fundraiser[]) => {
        this.fundraiser = response;
        console.log(this.fundraiser);
        this.initializeFormData();
      }
    )
  }


}
