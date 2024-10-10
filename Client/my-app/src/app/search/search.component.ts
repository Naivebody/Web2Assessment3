import {Component, OnInit} from '@angular/core';
import {Category} from '../class/Category';
import {DataService} from '../data.service';
import {Fundraiser} from '../class/Fundraiser';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  randomIMGnum : number = Math.floor(Math.random() * 5)
  categories:Category[] = [];
  specificFundraisers : Fundraiser[] = [];
  city: string = '';
  organizer: string = '';
  category:string = '';


  constructor(private dataService: DataService) {
  }
  ngOnInit() {
    this.getCategorieslist()
  }

  getCategorieslist(){
    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      }
    )
  }

  getSpecificFundraiser(){
    this.dataService.getFundraiserBySearch(this.city, this.organizer,this.category).subscribe(
      (response: Fundraiser[]) => {
        this.specificFundraisers = response;
        console.log(this.specificFundraisers);
      }
    )
  }

  clearScreen(){
    this.city='';
    this.organizer='';
    this.category='';
    this.specificFundraisers=[];
  }
}
