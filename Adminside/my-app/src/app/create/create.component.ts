import { Component ,OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Category} from '../Class/Category';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  categories: Category[]=[];
  isActive:boolean = false;

  constructor(private dataService: DataService,private redirect: Router) {
  }
  ngOnInit() {
    this.getCategory();
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
    if (!/^[A-Za-z\s]+$/.test(city)) {
      alert("Organizer can only contain space and letters.");
      return;
    }

    //The data submitted by the form is processed and sent to the server
    if (form.valid) {
      console.log('Form Data:', form.value);
      this.dataService.postFundraisertoDB(form.value).subscribe(
        data => {
          alert(data.message+' ID:'+data.id);
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
}
