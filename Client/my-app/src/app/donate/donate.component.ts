import { Component,OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrl: './donate.component.css'
})
export class DonateComponent implements OnInit {
  fundraiserID:number = 0;
  constructor(private dataService: DataService,private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.fundraiserID = params['info'];
      console.log(this.fundraiserID);//Debug if the ID has caught
    });
  }

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
