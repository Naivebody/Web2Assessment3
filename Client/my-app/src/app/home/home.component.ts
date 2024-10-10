import { Component ,OnInit} from '@angular/core';
import {Fundraiser} from '../class/Fundraiser';
import {DataService} from '../data.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  randomIMGnum : number = Math.floor(Math.random() * 5)
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
