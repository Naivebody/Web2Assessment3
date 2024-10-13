/**
 * This is a search component that retrieves data on categories and fundraising projects from 
 * the DataService service class and implements search and clear functions.
 */
import {Component, OnInit} from '@angular/core';
import {Category} from '../class/Category';
import {DataService} from '../data.service';
import {Fundraiser} from '../class/Fundraiser';
/**
 * A decorator for a component, which defines the selector, template file, and style file for that component.
 */
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
/**
 * The SearchComponent implements the OnInit interface. isWarning Indicates whether to display warning information. 
 * imgNum is an array of numbers from 1 to 5 that are used for image presentation. categories Stores information for 
 * all categories. specificFundraisers stores a list of fundraisers with specific conditions. city, organizer, and 
 * category are used to store the search criteria respectively
 */
export class SearchComponent implements OnInit {
  isWarning: boolean = false;
  imgNum : number[] =[1,2,3,4,5]
  categories:Category[] = [];
  specificFundraisers : Fundraiser[] = [];
  city: string = '';
  organizer: string = '';
  category:string = '';
  constructor(private dataService: DataService) {
  }
  /**
   * On initialization, the ngOnInit method calls the getCategorieslist method to get the category list.
   */
  ngOnInit() {
    this.getCategorieslist()
  }
/**
 * Call dataService's getAllCategories method to get data for all categories from the server and assign 
 * them to the Categories array. When successful, print the data to the console.
 */
  getCategorieslist(){
    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      }
    )
  }
/**
 * The dataService's getFundraiserBySearch method, which searches by city, organizer, and category, 
 * retrieves a list of eligible fundraisers from the server and assigns them to an array of specificFundraisers. 
 * Also, set isWarning to true to display the warning message.
 */
  getSpecificFundraiser(){
    this.isWarning = true;
    this.dataService.getFundraiserBySearch(this.city, this.organizer,this.category).subscribe(
      (response: Fundraiser[]) => {
        this.specificFundraisers = response;
        console.log(this.specificFundraisers);
      }
    )
  }
/**
 * Used to clear search criteria and results.
 */
  clearScreen(){
    this.city='';
    this.organizer='';
    this.category='';
    this.specificFundraisers=[];
  }
}
