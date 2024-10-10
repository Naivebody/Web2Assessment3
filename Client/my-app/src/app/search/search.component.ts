import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//Search
@Component({
  selector: 'app-search',
  templateUrl: '.arch.component.html',
  styleUrls: ['.arch.component.css']
})
export class SearchComponents {
  criteria = {
    organizer: '',
    city: '',
    category: ''
  };
  fundraisers: any[] = [];
  message: string = '';

  constructor(private fundraiserService: FundraiserService) {}

  searchFundraisers(): void {
    this.fundraiserService.searchFundraisers(this.criteria).subscribe(
      data => {
        this.fundraisers = data;
      },
      error => {
        this.message = 'Fail';
        console.error('Error searching fundraisers', error);
      }
    );
  }
}

//Fundraiser
@Component({
  selector: 'app-fundraiser',
  templateUrl: './fundraiser.component.html',
  styleUrls: ['./fundraiser.component.css']
})
export class FundraiserComponent implements OnInit {
  fundraiser: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private fundraiserService: FundraiserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.fundraiserService.getFundraiser(id).subscribe(
      data => {
        this.fundraiser = data;
      },
      error => {
        this.errorMessage = 'Fail';
        console.error('Error fetching data', error);
      }
    );
  }
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

}
