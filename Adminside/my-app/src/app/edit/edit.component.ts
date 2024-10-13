import {Component, OnInit, ViewChild} from '@angular/core';
import {Category} from '../Class/Category';
import {DataService} from '../data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {Fundraiser} from '../Class/Fundraiser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit {
  @ViewChild('editForm') editForm!: NgForm
  fundraiserID:number =0;
  fundraiser:Fundraiser[]=[];
  categories: Category[]=[];
  isActive:boolean = false;
  active:number = 0;
  constructor(private dataService: DataService,private redirect: Router,private router: ActivatedRoute) {
  }

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
  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.fundraiserID = params['info'];
      console.log(this.fundraiserID);//Debug if the ID has caught
    });
    this.getCategory();
    this.getFundraiser();

  }


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

  getCategory(){
    this.dataService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        console.log(this.categories);
      }
    )
  }

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
