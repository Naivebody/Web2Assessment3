import { Component,OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import {Fundraiser} from '../class/Fundraiser';
import {Donation} from '../class/Donation';

@Component({
  selector: 'app-fundraiser-detail',
  templateUrl: './fundraiser-detail.component.html',
  styleUrl: './fundraiser-detail.component.css'
})
export class FundraiserDetailComponent implements OnInit {
  imgNum : number[] =[1,2,3,4,5]
  isActive: boolean = false;
  dataID = 0;
  fundraiser : Fundraiser[]=[];
  donation : Donation[] = [];
 constructor(private dataService: DataService,private router: ActivatedRoute) { }

  ngOnInit() {

    this.router.queryParams.subscribe(params => {
    this.dataID = params['info'];
      console.log(this.dataID);//Debug if the ID has caught
    });
    this.getFundraiserDetail();
    this.getDonationDetail();
  }

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

  getDonationDetail() {
    this.dataService.getDonationByFundraiserID(this.dataID).subscribe(
      (response: Donation[]) =>{
        this.donation = response;
        console.log("Donation",this.donation);
      }
    )
  }

}
